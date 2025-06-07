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
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        localVideoRef.current.srcObject = stream;
        call.answer(stream);
        call.on("stream", (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
        });
      });
    });

    if (peerIdToCall) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
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
    <div style={{ marginTop: "20px" }}>
      <h3>Your Peer ID (Share with patient): {myPeerId}</h3>
      <div style={{ display: "flex", gap: "10px" }}>
        <video ref={localVideoRef} autoPlay muted style={{ width: "200px" }} />
        <video ref={remoteVideoRef} autoPlay style={{ width: "200px" }} />
      </div>
    </div>
  );
};

export default VideoCall;
