import React, { Orientation } from "react";
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
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import { isMobile } from "react-device-detect";

import "./controls.css";

const INIT_FREQ = 128;
const customRed = "hsl(0, 60%, 50%)";
const debug = true;

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
      playing: false,
      hue: 0,
      shiftedHue: 240,
      lightness: 32,
      frequency: INIT_FREQ
    };

    this.onHueChange = this.onHueChange.bind(this);
    this.hslToLab = this.hslToLab.bind(this);
    this.shiftToBlue = this.shiftToBlue.bind(this);
    this.convertLabToFreq = this.convertLabToFreq.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
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
    const frequency = this.convertLabToFreq(lightness);
    console.log(frequency);
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

  hslToLab(hue) {
    const rgb = convert.hsl.rgb.raw([hue, 100, 50]);
    const lab = convert.rgb.lab.raw(rgb);
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
    // const newX = parseInt((x - 32) * (23 / 65));
    // console.log(newX);
    // return notes[newX];
    return x * 4;
  }

  start() {
    const { synth } = this.props;
    synth.start("+.1");
    synth.volume.rampTo(-12, 0.1);
    this.setState({ playing: true });
  }

  stop() {
    const { synth } = this.props;
    synth.stop("+1.2");
    synth.volume.rampTo(-Infinity, 0.1);
    this.setState({ playing: false });
  }

  render() {
    const { playing } = this.state;
    const { synth, height } = this.props;

    return (
      <React.Fragment>
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100%",
            backgroundColor: playing
              ? `hsl(${this.state.shiftedHue}, 100%, 50%)`
              : "white",
            width: "100%"
          }}
        >
          {/* {this.state.playing ? (
            <div style={{ position: "absolute", top: "2%", fontSize: "20px" }}>
              {this.state.frequency.toFixed(1)}Hz
            </div>
          ) : null} */}
          <div style={{ zIndex: "2", color: customRed }}>sound on please</div>

          {/* Controls */}
          <div
            style={{
              width: "80%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {" "}
            <div id="buttons" style={{ display: "flex", marginBottom: "20px" }}>
              <div style={{ margin: "10px" }}>
                <PlayArrowIcon
                  style={{
                    fontSize: 60,
                    color: "hsl(0, 60%, 50%)",
                    backgroundColor: playing ? "green" : ""
                    // border: "1px solid green"
                  }}
                  onClick={this.start}
                />
              </div>

              <div style={{ margin: "10px" }}>
                <StopIcon
                  style={{ fontSize: 60, color: "black" }}
                  onClick={this.stop}
                ></StopIcon>
              </div>
            </div>
            <div id="slider-container" style={{ width: "80%" }}>
              <MySlider
                min={0}
                max={350}
                step={0.01}
                defaultValue={red}
                track={false}
                onChange={this.onHueChange}
              />
            </div>
            <span>slide me</span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Controls;
