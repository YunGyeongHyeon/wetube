"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onlyPrivate = exports.onlyPublic = exports.localsMiddelware = exports.uploadAvatar = exports.uploadVideo = void 0;

var _routes = _interopRequireDefault(require("./routes"));

var _multer = _interopRequireDefault(require("multer"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var s3 = new _awsSdk["default"].S3({
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  accessKeyId: process.env.AWS_KEY,
  region: 'ap-northeast-1'
});
var multerVideo = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    acl: 'public-read',
    bucket: 'wetube-y/video'
  })
});
var multerAvatar = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    acl: 'public-read',
    bucket: 'wetube-y/avatar'
  })
});
var uploadVideo = multerVideo.single('videoFile');
exports.uploadVideo = uploadVideo;
var uploadAvatar = multerAvatar.single('avatar');
exports.uploadAvatar = uploadAvatar;

var localsMiddelware = function localsMiddelware(req, res, next) {
  res.locals.siteName = 'WeTube';
  res.locals.routes = _routes["default"];
  res.locals.loggedUser = req.user || '';
  next();
};

exports.localsMiddelware = localsMiddelware;

var onlyPublic = function onlyPublic(req, res, next) {
  if (req.user) {
    res.redirect(_routes["default"].home);
  } else {
    next();
  }
};

exports.onlyPublic = onlyPublic;

var onlyPrivate = function onlyPrivate(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect(_routes["default"].home);
  }
};

exports.onlyPrivate = onlyPrivate;