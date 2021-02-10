import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client';
import { Stream } from 'stream';

import styles from './HomePage.module.scss'


interface Props {

}

interface Constrains {
  audio: boolean,
  video: {
    width: number,
    height: number
  }
}
const Homepage = (props: Props) => {
  const [constrains, setConstrains] = useState<Constrains>({
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

  useEffect(() => {
    const getUserMedia = (params: Constrains) => (new Promise((successCb: (stream: any) => void, errorCb) => {
      navigator.getUserMedia.call(navigator, params, successCb, errorCb)
    }))
    getUserMedia(constrains).then(
      (stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream
        videoRef.current?.play()

      }
    ).catch(console.log)

  }, [constrains])

  useEffect(() => {
    socket.on('connecting', () => console.log('Sockets Connetcted'));

    const mediaDevices = navigator.mediaDevices as any;
    if (mediaDevices) {
      console.log('Media devices supported!')
      let chunks: BlobPart[]
      mediaDevices.getDisplayMedia({ cursor: true }).then((mediaStream: any) => {
        const mediaRecorder = new MediaRecorder(mediaStream)
        mediaRecorder.onstart = e => chunks = [];
        mediaRecorder.ondataavailable = e => chunks.push(e.data)
        mediaRecorder.onstop = e => {
          const blob = new Blob(chunks);
          socket.emit('from-webrtc', blob)
        }
        mediaRecorder.start()
        setTimeout(() => {
          mediaRecorder.stop()
        }, 5000)
      })
    }
    socket.on('get-rtc-server', (blob: MediaStream) => {
      if (videoCapRef.current) videoCapRef.current.srcObject = blob
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
