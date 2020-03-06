"use strict";

var _getBlobDuration = _interopRequireDefault(require("get-blob-duration"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var videoContainer = document.getElementById('jsVideoPlayer');
var videoPlayer = document.querySelector('#jsVideoPlayer video');
var playBtn = document.getElementById('jsPlayBtn');
var volumeBtn = document.getElementById('jsVolumeBtn');
var fullScrnBtn = document.getElementById('jsFullScreen');
var currentTime = document.getElementById('currentTime');
var totalTime = document.getElementById('totalTime');
var volumeRange = document.getElementById('jsVolume');

var registerView = function registerView() {
  var videoId = window.location.href.split('/videos/')[1];
  fetch("/api/".concat(videoId, "/view"), {
    method: 'POST'
  });
};

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = "<i class='fas fa-pause'></i>";
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = "<i class='fas fa-play'></i>";
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeRange.value = videoPlayer.volume;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    videoPlayer.muted = true;
    volumeRange.value = 0;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function exitFullScreen() {
  fullScrnBtn.childElementCount.className = 'fas fa-expand';
  fullScrnBtn.addEventListener('click', goFullScreen);

  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function goFullScreen() {
  if (videoContainer.requestFullscreen) {
    videoPlayer.requestFullscreen();
  } else if (videoContainer.mozRequsetFullScreen) {
    videoPlayer.mozRequsetFullScreen();
  } else if (videoContainer.webkitRequsetFullscreen) {
    videoPlayer.webkitRequsetFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoPlayer.msRequestFullscreen();
  }

  fullScrnBtn.childElementCount.className = 'fas fa-compress';
  fullScrnBtn.removeEventListener('toggle', goFullScreen);
  fullScrnBtn.addEventListener('toggle', exitFullScreen);
}

var formatDate = function formatDate(seconds) {
  var secondsNumber = parseInt(seconds, 10);
  var hours = Math.floor(secondsNumber / 3600);
  var minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  var totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0".concat(hours);
  }

  if (minutes < 10) {
    minutes = "0".concat(minutes);
  }

  if (totalSeconds < 10) {
    totalSeconds = "0".concat(totalSeconds);
  }

  return "".concat(hours, ":").concat(minutes, ":").concat(totalSeconds);
};

function getCurrentTime() {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
}

function setTotalTime() {
  return _setTotalTime.apply(this, arguments);
}

function _setTotalTime() {
  _setTotalTime = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var blob, duration, totalTimeString;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(videoPlayer.src).then(function (response) {
              return response.blob();
            });

          case 2:
            blob = _context.sent;
            _context.next = 5;
            return (0, _getBlobDuration["default"])(blob);

          case 5:
            duration = _context.sent;
            console.log(duration);
            _context.next = 9;
            return formatDate(videoPlayer.duration);

          case 9:
            totalTimeString = _context.sent;
            console.log(totalTimeString);
            totalTime.innerHTML = totalTimeString;
            setInterval(getCurrentTime, 1000);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _setTotalTime.apply(this, arguments);
}

function handleEnded() {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = "<i class='fas fa-play'></i>";
}

function handleDrag(event) {
  var value = event.target.value;
  videoPlayer.volume = value;

  if (value >= 0.6) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.2) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else if (value == 0) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  }
}

function init() {
  videoPlayer.volume = 0.5;
  playBtn.addEventListener('click', handlePlayClick);
  jsVolumeBtn.addEventListener('click', handleVolumeClick);
  fullScrnBtn.addEventListener('click', goFullScreen);
  videoPlayer.addEventListener('onloadedmetadata', setTotalTime());
  videoPlayer.addEventListener('ended', handleEnded);
  volumeRange.addEventListener('input', handleDrag);
}

if (videoContainer) {
  init();
}

fetch('');