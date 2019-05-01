import React, { useRef, useState, useEffect } from "react";
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
    const context = canvasElement.current.getContext("2d");
    const width = videoElement.current.clientWidth;
    const height = videoElement.current.clientHeight;

    if (width > height) {
      context.drawImage(
        videoElement.current,
        (width - height) / 2,
        0,
        height,
        height
      );
    } else {
      context.drawImage(
        videoElement.current,
        0,
        (height - width) / 2,
        width,
        width
      );
    }
    const image = canvasElement.current.toDataURL("image/jpeg", 0.5);

    const stream = videoElement.current.srcObject;
    stream.getTracks()[0].stop();

    onTakePhoto(image);
  };

  const captureUserVideo = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoElement.current.srcObject = stream;
    // setStreamAdded(true);
  };

  useEffect(() => {
    captureUserVideo();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.videoContainer} hidden={!showCamera}>
        <video ref={videoElement} width="100%" autoPlay />
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
