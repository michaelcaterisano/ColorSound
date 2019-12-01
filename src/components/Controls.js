import React from "react";
import Text from "./Text";
import Tone from "tone";
import convert from "color-convert";
import blue from "../assets/blue.png";
import green from "../assets/green.png";
import yellow from "../assets/yellow.png";
import red from "../assets/red.png";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Slider } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { isMobile } from "react-device-detect";

import "./controls.css";

const INIT_FREQ = 128;

const iOSBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const MySlider = withStyles({
  root: {
    color: "red",
    height: 2,
    padding: "15px 0"
  },
  thumb: {
    height: 28,
    width: 28,
    backgroundColor: "#fff",
    boxShadow: iOSBoxShadow,
    marginTop: -14,
    marginLeft: -14,
    "&:focus,&:hover,&$active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: iOSBoxShadow
      }
    }
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hue: 0,
      shiftedHue: 240,
      lightness: 32,
      frequency: INIT_FREQ
    };

    this.onHueChange = this.onHueChange.bind(this);
    this.hslToLab = this.hslToLab.bind(this);
    this.shiftToBlue = this.shiftToBlue.bind(this);
    this.convertLabToFreq = this.convertLabToFreq.bind(this);
    this.expandedLightness = this.expandLightness.bind(this);
  }

  onHueChange(event, value) {
    const synth = this.props.synth;
    // get slider value (0 - 360 to represent hue). RED -> GREEN -> BLUE
    const hue = value;
    // shift values to start at 240. BLUE -> RED -> GREEN
    const shifted = this.shiftToBlue(value);
    // calculate LAB, get lightness value
    const lightness = this.hslToLab(shifted);
    // convert lightness value to frequency
    const frequency = this.convertLabToFreq(lightness) * 4;
    // set synth frequency
    synth.frequency.value = frequency;
    //
    this.setState({
      hue: hue,
      shiftedHue: shifted,
      lightness: lightness,
      frequency: frequency
    });
  }

  //TODO: Move utility functions to helper file
  hslToLab(hue) {
    console.log(`hue: ${hue}`);
    const rgb = convert.hsl.rgb.raw([hue, 100, 50]);
    const lab = convert.rgb.lab.raw(rgb);
    console.log(`lab: ${lab}`);
    return lab[0];
  }

  shiftToBlue(val) {
    const shifted = parseFloat(val) + 240;
    if (shifted >= 360) {
      return shifted - 360;
    }
    return shifted;
  }

  convertLabToFreq(x) {
    // shift and expand frequency range
    // return (x - 32) * (600 / 65) + 200;
    return x;
  }

  expandLightness(x) {
    return x === null ? 0 : (x - 32) * (100 / 65);
  }

  render() {
    const synth = this.props.synth;
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: isMobile ? window.innerHeight : "100vh",
            width: "100%",
            backgroundColor: `hsl(${this.state.shiftedHue}, 100%, 50%)`
          }}
        >
          <Typography color="secondary">sound on please</Typography>
          {/* Blue */}
          <div className="wrapper">
            <img src={blue} alt=""></img>
          </div>
          {/* Controls */}
          <div
            style={{
              width: "80vw",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {" "}
            <div id="buttons" style={{ display: "flex", marginBottom: "20px" }}>
              <div style={{ margin: "10px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => synth.start()}
                >
                  start
                </Button>
              </div>

              <div style={{ margin: "10px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => synth.stop()}
                >
                  stop
                </Button>
              </div>
            </div>
            <div id="slider-container" style={{ width: "80%" }}>
              <MySlider
                min={0}
                max={255}
                step={0.01}
                defaultValue={red}
                track={false}
                onChange={this.onHueChange}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Controls;
