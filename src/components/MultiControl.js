import React from "react";
import Controls from "./Controls";
import Tone from "tone";
import { isMobile } from "react-device-detect";

const INIT_FREQ = 129;

const classes = {
  containerTop: {
    height: isMobile ? window.innerHeight : "100vh",
    display: "flex",
    flexDirection: "column"
  },
  topRow: {
    height: "100%",
    display: "flex"
  },
  bottomRow: {
    display: "flex",
    height: "100%"
  }
};

const MultiControl = () => {
  const synthOne = new Tone.Oscillator(INIT_FREQ, "triangle16").toMaster();
  const synthTwo = new Tone.Oscillator(INIT_FREQ, "triangle").toMaster();
  const synthThree = new Tone.Oscillator(INIT_FREQ, "triangle6").toMaster();
  const synthFour = new Tone.Oscillator(INIT_FREQ, "triangle").toMaster();

  return (
    <div style={classes.containerTop}>
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

export default MultiControl;
