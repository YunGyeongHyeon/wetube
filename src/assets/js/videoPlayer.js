import getBlobDuration from 'get-blob-duration'
import axios from 'axios'

const videoContainer = document.getElementById('jsVideoPlayer')
const videoPlayer = document.querySelector('#jsVideoPlayer video')
const playBtn = document.getElementById('jsPlayBtn')
const volumeBtn = document.getElementById('jsVolumeBtn')
const fullScrnBtn = document.getElementById('jsFullScreen')
const currentTime = document.getElementById('currentTime')
const totalTime = document.getElementById('totalTime')
const volumeRange = document.getElementById('jsVolume')

const registerView = () => {
  const videoId = window.location.href.split('/videos/')[1]
  fetch(`/api/${videoId}/view`, {
    method: 'POST'
  })
}

function handlePlayClick () {
  if (videoPlayer.paused) {
    videoPlayer.play()
    playBtn.innerHTML = "<i class='fas fa-pause'></i>"
  } else {
    videoPlayer.pause()
    playBtn.innerHTML = "<i class='fas fa-play'></i>"
  }
}

function handleVolumeClick () {
  if (videoPlayer.muted) {
    videoPlayer.muted = false
    volumeRange.value = videoPlayer.volume
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>'
  } else {
    videoPlayer.muted = true
    volumeRange.value = 0
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'
  }
}

function exitFullScreen () {
  fullScrnBtn.childElementCount.className = 'fas fa-expand'
  fullScrnBtn.addEventListener('click', goFullScreen)
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}

function goFullScreen () {
  if (videoContainer.requestFullscreen) {
    videoPlayer.requestFullscreen()
  } else if (videoContainer.mozRequsetFullScreen) {
    videoPlayer.mozRequsetFullScreen()
  } else if (videoContainer.webkitRequsetFullscreen) {
    videoPlayer.webkitRequsetFullscreen()
  } else if (videoContainer.msRequestFullscreen) {
    videoPlayer.msRequestFullscreen()
  }

  fullScrnBtn.childElementCount.className = 'fas fa-compress'
  fullScrnBtn.removeEventListener('toggle', goFullScreen)
  fullScrnBtn.addEventListener('toggle', exitFullScreen)
}

const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10)
  let hours = Math.floor(secondsNumber / 3600)
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60)
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60

  if (hours < 10) {
    hours = `0${hours}`
  }
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`
  }
  return `${hours}:${minutes}:${totalSeconds}`
}

function getCurrentTime () {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime))
}

async function setTotalTime () {
  const blob = await fetch(videoPlayer.src).then(response => response.blob())
  const duration = await getBlobDuration(blob)
  console.log(duration)
  const totalTimeString = await formatDate(videoPlayer.duration)
  console.log(totalTimeString)
  totalTime.innerHTML = totalTimeString

  setInterval(getCurrentTime, 1000)
}

function handleEnded () {
  registerView()
  videoPlayer.currentTime = 0
  playBtn.innerHTML = "<i class='fas fa-play'></i>"
}

function handleDrag (event) {
  const {
    target: { value }
  } = event
  videoPlayer.volume = value
  if (value >= 0.6) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>'
  } else if (value >= 0.2) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>'
  } else if (value == 0) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>'
  }
}

function init () {
  videoPlayer.volume = 0.5
  playBtn.addEventListener('click', handlePlayClick)
  jsVolumeBtn.addEventListener('click', handleVolumeClick)
  fullScrnBtn.addEventListener('click', goFullScreen)
  videoPlayer.addEventListener('onloadedmetadata', setTotalTime())
  videoPlayer.addEventListener('ended', handleEnded)
  volumeRange.addEventListener('input', handleDrag)
}

if (videoContainer) {
  init()
}

fetch('')
