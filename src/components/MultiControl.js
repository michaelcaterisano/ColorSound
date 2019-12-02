import React from "react";
import Controls from "./Controls";
import Tone from "tone";
import { isMobile } from "react-device-detect";
import { withOrientationChange } from "react-device-detect";

let height = window.innerHeight;

window.addEventListener("orientationchange", function(e) {
  height = window.innerHeight;
});

const INIT_FREQ = 129;

const classes = {
  topRow: {
    height: "100%",
    display: "flex"
  },
  bottomRow: {
    display: "flex",
    height: "100%"
  }
};
const synthOne = new Tone.Oscillator(INIT_FREQ, "triangle16").toMaster();
const synthTwo = new Tone.Oscillator(INIT_FREQ, "triangle").toMaster();
const synthThree = new Tone.Oscillator(INIT_FREQ, "triangle16").toMaster();
const synthFour = new Tone.Oscillator(INIT_FREQ, "triangle").toMaster();

const MultiControl = () => {
  return (
    <div style={{ height: height, display: "flex", flexDirection: "column" }}>
      <div style={classes.topRow}>
        <Controls synth={synthOne} />
        <Controls synth={synthTwo} />
      </div>
      <div style={classes.bottomRow}>
        <Controls synth={synthThree} />
        <Controls synth={synthFour} />
      </div>
    </div>
  );
};

export default withOrientationChange(MultiControl);
