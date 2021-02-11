import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client';
import * as mediaCapture from '../../utils/mediaDevices'

import styles from './HomePage.module.scss'


const Homepage = () => {
  const [constrains, setConstrains] = useState<mediaCapture.Constrains>({
    audio: false,
    video: {
      width: 400,
      height: 300
    }
  })
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoCapRef = useRef<HTMLVideoElement>(null);
  const socket = io('http://localhost:5000/');
  // const canvasRef = useRef<HTMLCanvasElement>(null)

  // useEffect(() => {
  //   mediaCapture.getUserMedia(constrains).then(
  //     (stream) => {
  //       if (videoRef.current) videoRef.current.srcObject = stream
  //       videoRef.current?.play()

  //     }
  //   ).catch(console.log)

  // }, [constrains])

  useEffect(() => {
    mediaCapture.getDisplayMedia(constrains).then(
      stream => {
        socket.on('connect', () => console.log('Connected'))
        let mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = e => {
          return socket.emit('webrtc-binary', e.data)
        }
        mediaRecorder.start(3000)

        videoCapRef.current!.srcObject = stream
      }
    )


    return (() => {
      socket.on('disconnect', () => console.log("Sockets disconnected"))
    })
  }, [])

  return (
    <div className={styles.container}>
      <video className={styles.videoCapture} ref={videoCapRef} autoPlay></video>
      {/* <video className={styles.videoCam} ref={videoRef}></video> */}
      {/* <canvas className={styles.canvas} ref={canvasRef}></canvas> */}
    </div >
  )
}

export default Homepage
