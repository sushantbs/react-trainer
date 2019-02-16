import React from "react";
import { Button } from "@material-ui/core";

export function Leave({ onLeave }) {
  return (
    <div className="leave-container">
      <div> Are you sure you want to leave the room </div>
      <Button
        size="medium"
        color="secondary"
        variant="contained"
        onClick={onLeave}
      >
        Leave
      </Button>
    </div>
  );
}
