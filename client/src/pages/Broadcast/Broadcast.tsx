import React, { useRef } from 'react'
import socketIOClient from "socket.io-client";


interface Props {

}

const Broadcast = (props: Props) => {

  const mediaStream = useRef();
  const mediaRecorder = useRef()

  return (
    <div>

    Shows All Broadcasts
    </div>
  )
}

export default Broadcast
