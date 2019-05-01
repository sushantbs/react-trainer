import React, { useState, useRef, useEffect } from "react";
import { withStyles } from "@material-ui/core";
// import Camera, { FACING_MODES } from "react-html5-camera-photo";
import { Camera } from "../../components/capture-photo";
import { SketchField, Tools } from "react-sketch";

const commonStyles = {
  verticalFlex: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    flexGrow: 1
  },
  horizontalFlex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center"
  }
};

const styles = theme => {
  return {
    root: {
      ...commonStyles.verticalFlex,
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      [theme.breakpoints.down("xs")]: {}
    },
    smallText: {
      fontSize: theme.fontSizes.small
    },
    avatarContainer: {
      flexGrow: 1
    },
    handleContainer: {
      height: "100px",
      flexGrow: 0,
      border: "1px solid black"
    },
    buttonContainer: {
      ...commonStyles.horizontalFlex,
      alignItems: "center",
      flexGrow: 0,
      height: "50px"
    }
  };
};

function ProfileComponent(props) {
  const { classes, onProfileUpdate } = props;
  const [handle, setHandle] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [takePhoto, setTakePhoto] = useState(false);

  const sketchElement = useRef(null);

  const updateProfile = async () => {
    onProfileUpdate({
      id: "dummyId", // this should come from the response of the network call
      handle,
      avatar
    });
  };

  const userPhotoTaken = async dataUri => {
    setAvatar(dataUri);
    setTakePhoto(false);
  };

  const sketchOnChange = async () => {
    // this handler is also called when sketch is removed. e.g when user clicks "Take Photo"
    if (sketchElement.current) {
      const avatarDataURL = sketchElement.current.toDataURL();
      setAvatar(avatarDataURL);
    }
  };

  useEffect(() => {
    sketchElement.current &&
      sketchElement.current.setBackgroundFromDataUrl(avatar);
  }, [avatar]);

  return (
    <div className={classes.root}>
      <div className={classes.avatarContainer}>
        {!takePhoto && (
          <div>
            <SketchField
              ref={sketchElement}
              tool={Tools.Pencil}
              backgroundColor="white"
              lineColor="black"
              onChange={sketchOnChange}
              lineWidth={3}
            />
            <input
              type="button"
              value="Take Photo"
              onClick={e => setTakePhoto(true)}
            />
          </div>
        )}
        {takePhoto && <Camera onTakePhoto={userPhotoTaken} />}
      </div>
      <div className={classes.handleContainer}>
        <input
          type="text"
          value={handle}
          onChange={e => setHandle(e.target.value)}
        />
      </div>
      <div className={classes.buttonContainer}>
        <img style={{ height: "100%" }} alt="avatar" src={avatar} />
        <input
          disabled={!avatar || !handle}
          type="button"
          value="Let's Play!"
          onClick={updateProfile}
        />
      </div>
    </div>
  );
}

export const Profile = withStyles(styles, { withTheme: true })(
  ProfileComponent
);
