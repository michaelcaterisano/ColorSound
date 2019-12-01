import React from "react";
import Controls from "./Controls";
import RGB from "./RGB";
import Tone from "tone";
import { callbackify } from "util";
import { isMobile } from "react-device-detect";

const INIT_FREQ = 0;

const style = {
  screen: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: isMobile ? window.innerHeight : "100vh",
    maxWidth: "100%"
  },

  squareOne: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "50vw",
    height: "50vh"
  },
  squareTwo: {
    position: "fixed",
    top: "0",
    right: "0",
    width: "50vw",
    height: "50vh"
  },
  squareThree: {
    position: "fixed",
    bottom: "0",
    left: "0",
    width: "50vw",
    height: "50vh"
  },
  squareFour: {
    position: "fixed",
    bottom: "0",
    right: "0",
    width: "50vw",
    height: "50vh"
  }
};

const MultiControl = () => {
  const synthOne = new Tone.Oscillator(INIT_FREQ, "triangle9").toMaster();
  const synthTwo = new Tone.Oscillator(INIT_FREQ, "triangle").toMaster();
  const synthThree = new Tone.Oscillator(INIT_FREQ, "triangle").toMaster();
  const synthFour = new Tone.Oscillator(INIT_FREQ, "triangle").toMaster();

  return (
    <div style={style.screen}>
      {" "}
      <RGB synth={synthOne} />
    </div>
  );
};

export default MultiControl;
