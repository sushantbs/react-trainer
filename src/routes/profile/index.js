import React, { useState } from "react";
import { withStyles } from "@material-ui/core";

const styles = theme => {
  return {
    root: {
      backgroundColor: theme.palette.secondary,
      [theme.breakpoints.down("xs")]: {}
    },
    smallText: {
      fontSize: theme.fontSizes.small
    }
  };
};

function ProfileComponent(props) {
  return <div>Convert this to the profile</div>;
}

export const Profile = withStyles(styles, { withTheme: true })(
  ProfileComponent
);
