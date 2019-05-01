import React, { useRef, useState } from "react";
import { withStyles } from "@material-ui/core";

const style = theme => {
  return {
    root: {},
    videoContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center"
    }
  };
};

function CapturePhoto(props) {
  const { classes, onTakePhoto } = props;

  const showCamera = useState(true);

  const videoElement = useRef(null);
  const canvasElement = useRef(null);

  const captureSnapshot = () => {
    const context = canvasElement.getContext("2d");
    context.drawImage(videoElement, 0, 0, 800, 600);
    const image = canvasElement.toDataURL("image/jpeg", 0.5);
    onTakePhoto(image);
  };

  return (
    <div className={classes.root}>
      <div className={classes.videoContainer} hidden={!showCamera}>
        <video
          ref={videoElement}
          width="800"
          height="600"
          style={{ display: "none" }}
        />
        <input type="button" value="Capture" onClick={captureSnapshot} />
      </div>
      <canvas
        ref={canvasElement}
        width="800"
        height="600"
        style={{ display: "none" }}
      />
    </div>
  );
}

export const Camera = withStyles(style, { withTheme: true })(CapturePhoto);
