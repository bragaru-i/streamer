/// <reference types="webrtc" />
const getUserMedia = navigator.mediaDevices.getUserMedia ||
                     navigator.getUserMedia ||
                     navigator.webkitGetUserMedia ||
                     navigator.mozGetUserMedia
