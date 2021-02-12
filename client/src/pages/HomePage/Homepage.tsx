import React from 'react'
import useHomepageHook from './useHomepageHook'

import styles from './HomePage.module.scss'



const Homepage : React.FC = () => {

  const { userVideo, callPeer, partnerVideo, receivingCall, users, acceptCall, caller, yourID } = useHomepageHook()
  let incomingCall = receivingCall && (
    <div>
      <h1>{caller} is calling you</h1>
      <button onClick={acceptCall}>Accept</button>
    </div>
  )



  return (
    <div className={styles.container}>
      <div> Your video</div>
      <video className={styles.videoCapture} ref={userVideo} autoPlay></video>
      {incomingCall}
      <div> Parner Video</div>
      <video className={styles.videoCapture} ref={partnerVideo} autoPlay></video>
      {Object.keys(users).map(key => {
        if (key === yourID) {
          return null;
        }
        return (
          <button key={key} onClick={() => callPeer(key)}>Call {key}</button>
        );
      })}
      {/* <video className={styles.videoCam} ref={videoRef}></video> */}
      {/* <canvas className={styles.canvas} ref={canvasRef}></canvas> */}
    </div >
  )
}

export default Homepage
