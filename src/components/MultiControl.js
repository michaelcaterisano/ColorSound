import React from "react";
import Controls from "./Controls";
import Tone from "tone";

const INIT_FREQ = 128;

const style = {
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
    <div>
      {" "}
      <div>
        <Controls synth={synthOne} />
      </div>
      {/* <div style={style.squareTwo}>
        {" "}
        <Controls synth={synthTwo} />
      </div>
      <div style={style.squareThree}>
        {" "}
        <Controls synth={synthThree} />
      </div>
      <div style={style.squareFour}>
        {" "}
        <Controls synth={synthFour} />
      </div> */}
    </div>
  );
};

export default MultiControl;
