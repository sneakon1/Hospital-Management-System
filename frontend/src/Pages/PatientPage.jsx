import VideoCall from "../components/VideoCall";


function PatientPage() {
  const [startCall, setStartCall] = useState(false);
  const [doctorPeerId, setDoctorPeerId] = useState(""); // get from backend or doctor

  return (
    <div>
      <h1>Welcome, Patient!</h1>

      {!startCall ? (
        <>
          <input
            type="text"
            placeholder="Enter Doctor's Peer ID"
            value={doctorPeerId}
            onChange={(e) => setDoctorPeerId(e.target.value)}
          />
          <button onClick={() => setStartCall(true)}>Start Video Call</button>
        </>
      ) : (
        <VideoCall peerIdToCall={doctorPeerId} />
      )}
    </div>
  );
}
