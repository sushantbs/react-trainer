const webrtc = (
  socket,
  me,
  { setRTCReady, setLocalStream, setIncomingRTCRequest, addNewRemoteStream }
) => {
  const constraints = { video: true, audio: true };
  // const servers = {
  //   iceServers: [
  //     {
  //       urls: "stun:stun.l.google.com:19302"
  //     }
  //   ]
  // };
  const servers = null;
  let pc = new RTCPeerConnection(servers);
  pc.onicecandidate = ({ candidate }) => {
    socket.emit("icecandidate", { candidate });
  };

  socket.on("icecandidate", async ({ candidate }) => {
    if (candidate) {
      await pc.addIceCandidate(candidate);
    }
  });

  socket.on("rtcOffer", async ({ offerBy, offerTo, description }) => {
    if (offerTo === me.id) {
      setIncomingRTCRequest({ caller: offerBy, description });
    } else {
      throw new Error(
        `Something is seriously wrong! Received the offer meant for ${offerTo}`
      );
    }
  });

  socket.on("rtcAnswer", async ({ answerBy, description }) => {
    await pc.setRemoteDescription(description);
  });

  pc.ontrack = ({ streams }) => {
    addNewRemoteStream({
      stream: streams[0]
    });
  };

  setRTCReady(true);

  return {
    async call(playerId) {
      try {
        pc.onnegotiationneeded = async () => {
          debugger;
          await pc.setLocalDescription(await pc.createOffer());
          socket.emit("rtcOffer", {
            offerBy: me.id,
            offerTo: playerId,
            description: pc.localDescription
          });
        };

        // get local stream, show it in self-view and add it to be sent
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        stream.getTracks().forEach(track => pc.addTrack(track, stream));

        setLocalStream(stream);
      } catch (err) {
        console.error(err);
      }
    },

    async answerCall({ description, caller }) {
      await pc.setRemoteDescription(description);

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      stream.getTracks().forEach(track => pc.addTrack(track, stream));

      setLocalStream(stream);

      await pc.setLocalDescription(await pc.createAnswer());
      socket.emit("rtcAnswer", {
        answerTo: caller,
        answerBy: me.id,
        description: pc.localDescription
      });

      setIncomingRTCRequest(null);
    },

    endCall() {
      pc.onnegotiationneeded = null;
      pc.ontrack = null;
      pc.close && pc.close();
    },
    onCallConnect() {}
  };
};

export default webrtc;
