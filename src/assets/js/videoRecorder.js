const recorderContainer = document.getElementById('jsRecordContainer')
const recordBtn = document.getElementById('jsRecordBtn')
const videoPreview = document.getElementById('jsVideoPreview')

let streamObject
let videoRecoreder

const handleVideoData = event => {
  const { data: videoFile } = event
  const link = document.createElement('a')
  link.href = URL.createObjectURL(videoFile)
  link.download = 'recorded.webm'
  document.body.appendChild(link)
  link.click()
}

const startRecording = () => {
  videoRecoreder = new MediaRecorder(streamObject)
  videoRecoreder.start()
  videoRecoreder.addEventListener('dataavailable', handleVideoData)
  recordBtn.addEventListener('click', stopRecording)
}

const stopRecording = () => {
  videoRecoreder.stop()
  recordBtn.removeEventListener('click', stopRecording)
  recordBtn.addEventListener('click', getVideo)
  recordBtn.innerHTML = 'Start recording'
}

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    })
    videoPreview.srcObject = stream
    videoPreview.muted = true
    videoPreview.play()
    recordBtn.innerHTML = 'Stop recording'
    streamObject = stream
    startRecording()
  } catch (error) {
    console.log(error + ' 에러입니다.')
    recordBtn.innerHTML = '🤭 Cant record'
    recordBtn.removeEventListener('click', getVideo)
  } finally {
    recordBtn.removeEventListener('click', getVideo)
  }
}

function init () {
  recordBtn.addEventListener('click', getVideo)
}

if (recorderContainer) {
  init()
}
