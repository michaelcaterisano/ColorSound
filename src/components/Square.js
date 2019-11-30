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
          width: "100%",
          height: "100%",
          color: "white",
          backgroundColor: `hsl(${shiftedHue}, 100%, 50%)`
        }}
      >
        <div
          style={{
            zIndex: "1",
            textAlign: "center",
            fontSize: "30px",
            marginTop: "20%",
            border: "5px solid red",
            width: "300px",
            padding: "30px"
          }}
        >
          <div>
            Brightness: <span>{lightness}</span>
          </div>
          <div>
            Frequency: <span>{frequency}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Square;
