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

function GameComponent(props) {
  const { players, onGameEnd, classes } = props;
  const [someState, setSomeState] = useState(null);
  const [askConfirmationToLeave, setAskConfirmationToLeave] = useState(false);
  const [endGameInProgress, setEndGameInProgress] = useState(false);

  // Actions
  const onLeaveGame = async () => {
    setAskConfirmationToLeave(true);
  };

  const endGame = async () => {
    setAskConfirmationToLeave(false);
    setEndGameInProgress(true);
    // Logic to end the game
    const result = await Promise.resolve({ success: true });
    setTimeout(() => {
      setEndGameInProgress(false);
      onGameEnd(result);
    }, 2000);
  };

  return (
    <>
      {askConfirmationToLeave && (
        <div className={classes.messageBlock}>
          <p>
            <h2>Are you sure you wanna leave, bruh??</h2>
            <br />
            <h3>Once you leave you can't come back, you know?</h3>
            <br />
            <span className={classes.smallText}>
              (Just kidding, you can join anytime you want)
            </span>
          </p>
          <input type="button" value="Confirm" onClick={e => endGame()} />
        </div>
      )}
      {endGameInProgress && (
        <div className={classes.messageBlock}> Ok, See you! </div>
      )}
      {askConfirmationToLeave || endGameInProgress || (
        <div className={classes.messageBlock}>
          <div>Convert this to the game</div>
          <h3>I want to leave the game</h3>
          <input
            type="button"
            value="Leave Room"
            onClick={() => onLeaveGame()}
          />
        </div>
      )}
    </>
  );
}

export const Game = withStyles(styles, { withTheme: true })(GameComponent);
