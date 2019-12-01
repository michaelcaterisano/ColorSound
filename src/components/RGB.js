import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import convert from "color-convert";

const SCALE = 8;
const SHIFT = 100;

const classes = {
  sliders: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    width: 300,
    marginBottom: "30px",
    border: "1px solid green"
  },
  slider: {
    height: "100%",
    padding: "0 20px 0 20px"
  }
};

class RGB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      red: 30,
      green: 0,
      blue: 80,
      lightness: 0,
      frequency: 0
    };

    this.handleRedChange = this.handleRedChange.bind(this);
    this.handleGreenChange = this.handleGreenChange.bind(this);
    this.handleBlueChange = this.handleBlueChange.bind(this);
    this.updateLightness = this.updateLightness.bind(this);
  }

  handleRedChange(event, value) {
    this.setState({ red: value }, () => this.updateLightness());
  }

  handleGreenChange(event, value) {
    this.setState({ green: value }, () => this.updateLightness());
  }

  handleBlueChange(event, value) {
    this.setState({ blue: value }, () => this.updateLightness());
  }

  updateLightness() {
    const synth = this.props.synth;
    const { red, green, blue } = this.state;
    const lab = convert.rgb.lab.raw(red, green, blue);
    const lightness = lab[0].toFixed(2);
    const frequency = lightness * SCALE + SHIFT;
    synth.frequency.value = frequency;
    this.setState({ lightness, frequency });
  }

  componentDidMount() {
    const { synth } = this.props;
    this.updateLightness();
    synth.start();
  }

  render() {
    const synth = this.props.synth;
    synth.frequency.value = this.state.frequency;
    console.log(this.state);
    const { red, green, blue } = this.state;
    return (
      <React.Fragment>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: `rgb(${red}, ${green}, ${blue})`
          }}
        >
          <div style={classes.sliders}>
            <div style={classes.slider}>
              <Slider
                min={0}
                max={255}
                step={0.01}
                orientation="vertical"
                defaultValue={red}
                track={false}
                onChange={this.handleRedChange}
              />
              <Typography color="primary" gutterbottom>
                red
              </Typography>
            </div>

            <div style={classes.slider}>
              <Slider
                min={0}
                max={255}
                step={0.01}
                orientation="vertical"
                defaultValue={green}
                track={false}
                onChange={this.handleGreenChange}
              />
              <Typography color="primary" gutterbottom>
                green
              </Typography>
            </div>

            <div style={classes.slider}>
              <Slider
                min={0}
                max={255}
                step={0.01}
                orientation="vertical"
                defaultValue={blue}
                track={false}
                onChange={this.handleBlueChange}
              />
              <Typography color="primary" gutterbottom>
                blue
              </Typography>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RGB;
