import { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import Peer from "simple-peer";


import * as mediaCapture from '../../utils/mediaDevices'

const useHomePageHook = () => {
  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState<any>();
  const [callAccepted, setCallAccepted] = useState(false);
  const [constrains, setConstrains] = useState({
    audio: false,
    video: {
      width: 400,
      height: 300
    }
  })

  const userVideo = useRef<any>();
  const partnerVideo = useRef<any>();
  const socket = useRef<any>();

  useEffect(() => {
    socket.current = io('http://localhost:5000')
    mediaCapture.getDisplayMedia(constrains).then(stream => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    })
    socket.current.on('connection', () => console.log('connected'))
    socket.current.on("yourID", (id: any) => {
      setYourID(id);
    })
    socket.current.on("allUsers", (users: any) => {
      setUsers(users);
    })

    socket.current.on("hey", (data: any) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    })
    return (()=>{
      socket.current.on('disconnect', ()=> console.log('Sockets disconnected'))
    })
  }, [])


  function callPeer(id: any) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", data => {
      socket.current.emit("callUser", { userToCall: id, signalData: data, from: yourID })
    })

    peer.on("stream", stream => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.current.on("callAccepted", (signal: string | Peer.SignalData) => {
      setCallAccepted(true);
      peer.signal(signal);
    })

  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", data => {
      socket.current.emit("acceptCall", { signal: data, to: caller })
    })

    peer.on("stream", stream => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  return {
    userVideo, users, partnerVideo, callPeer, receivingCall, caller, acceptCall, yourID
  }

}

export default useHomePageHook