import React from "react";
import { relative } from "path";

class Text extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const shiftedHue = this.props.shiftedHue;
    console.log(`shifted hue: ${shiftedHue}`);
    const lightness = this.props.lightness.toFixed(2);
    const frequency = this.props.frequency.toFixed(2);
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          height: "100%",
          width: "100%",
          color: "white"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            zIndex: "1",
            fontSize: "60px",
            width: "100%",
            height: "20%",
            padding: "30px"
          }}
        >
          <div>
            <span>Lightness: {lightness}</span>
          </div>
          <div>
            <span>Frequency: {frequency}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Text;
