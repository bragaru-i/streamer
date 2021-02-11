// handle user media capture
export interface Constrains {
  audio: boolean,
  video: {
    width: number,
    height: number
  }
}

export const getUserMedia = (params: Constrains) => (new Promise((successCb: (stream: any) => void, errorCb) => {
  if (navigator.getUserMedia) navigator.getUserMedia.call(navigator, params, successCb, errorCb)
  else errorCb()
}))

export const getDisplayMedia = (params: Constrains) => (new Promise((successCb: (stream: any) => void, errorCb) => {
  // @ts-ignore
  if (navigator.mediaDevices.getDisplayMedia) successCb(navigator.mediaDevices.getDisplayMedia(navigator, params, successCb, errorCb))
  else errorCb()
}))

