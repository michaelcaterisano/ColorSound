import React from "react";

class Square extends React.Component {
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
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100vw",
          height: "100vh",
          color: "white",
          backgroundColor: `hsl(${shiftedHue}, 100%, 50%)`
        }}
      >
        <div
          style={{ textAlign: "center", fontSize: "100px", marginTop: "20%" }}
        >
          <div>{lightness}</div>
          {/* <div>frequency {frequency}</div> */}
        </div>
      </div>
    );
  }
}

export default Square;
