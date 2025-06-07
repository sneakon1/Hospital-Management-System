import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

const VideoCall = ({ peerIdToCall }) => {
  const [myPeerId, setMyPeerId] = useState("");
  const [callStarted, setCallStarted] = useState(false);
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      setMyPeerId(id);
    });

    peer.on("call", (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          localVideoRef.current.srcObject = stream;
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
          });
        });
    });

    if (peerIdToCall) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          localVideoRef.current.srcObject = stream;
          const call = peer.call(peerIdToCall, stream);
          call.on("stream", (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
          });
        });

      setCallStarted(true);
    }
  }, [peerIdToCall]);

  return (
    <div>
      <h2>Your Peer ID: {myPeerId}</h2>
      {peerIdToCall ? (
        <p>Calling peer: {peerIdToCall}</p>
      ) : (
        <p>Share this ID with the other person to start the call</p>
      )}
      <video ref={localVideoRef} autoPlay muted style={{ width: "300px" }} />
      <video ref={remoteVideoRef} autoPlay style={{ width: "300px" }} />
    </div>
  );
};

export default VideoCall;
