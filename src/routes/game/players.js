import React, { useRef, useState, useEffect } from "react";
import { CallRounded } from "@material-ui/icons";
import { Card, CardHeader, Button } from "@material-ui/core";

function renderLocalStreamVideo(onHangup, localRef) {
  return (
    <div className="local-video-container">
      <video ref={localRef} autoPlay />
      <Button
        className="hang-up-button"
        color="secondary"
        variant="contained"
        onClick={() => onHangup()}
      >
        Hang up
      </Button>
    </div>
  );
}

function renderRemoteStreamsVideo(remoteVideo) {
  return (
    <div className="remote-video-container">
      <video ref={remoteVideo} autoPlay />
    </div>
  );
}

export function Players(props) {
  const {
    players,
    rtcReady,
    onCallPlayer,
    onAnswerCall,
    localStream,
    remoteStreams,
    incomingRTCRequest
  } = props;

  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const [localStreamAdded, setLocalStreamAdded] = useState(false);
  const [remoteStreamAdded, setRemoteStreamAdded] = useState(false);

  useEffect(() => {
    if (!localStreamAdded && localStream) {
      localVideo.current.srcObject = localStream;
      setLocalStreamAdded(true);
    }

    if (!remoteStreamAdded && remoteStreams.length) {
      remoteVideo.current.srcObject = remoteStreams[0].stream;
      setRemoteStreamAdded(true);
    }
  });

  return (
    <div className="players-container">
      <h2> Players </h2>
      <div className="player-list">
        {players.map((player, index) => (
          <Card className="player-item" key={index}>
            <CardHeader
              className="player-info"
              avatar={
                <img
                  alt={player.handle}
                  src={`https://api.adorable.io/avatars/60/${
                    player.avatar
                  }@adorable.io.png`}
                />
              }
              title={
                <div className="player-details">
                  <h3>{player.handle}</h3>
                </div>
              }
            />
            {rtcReady && player.rtcReady ? (
              <div className="player-comm">
                <Button onClick={() => onCallPlayer(player.id)}>
                  <CallRounded size="medium" />
                </Button>
              </div>
            ) : null}
          </Card>
        ))}
      </div>
      {incomingRTCRequest ? (
        <div className="incoming-call-notification">
          <span>
            Incoming call from
            {
              players.find(player => player.id === incomingRTCRequest.caller)
                .handle
            }
          </span>
          <Button onClick={() => onAnswerCall(incomingRTCRequest)}>
            Answer
          </Button>
        </div>
      ) : null}
      {localStream ? renderLocalStreamVideo(() => {}, localVideo) : null}
      {remoteStreams ? renderRemoteStreamsVideo(remoteVideo) : null}
    </div>
  );
}
