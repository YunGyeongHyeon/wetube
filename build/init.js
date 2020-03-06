"use strict";

require("@babel/polyfill");

var _dotenv = _interopRequireDefault(require("dotenv"));

require("./db");

var _app = _interopRequireDefault(require("./app"));

var _https = _interopRequireDefault(require("https"));

var _fs = _interopRequireDefault(require("fs"));

require("./models/Video");

require("./models/Comment");

require("./models/User");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var PORT = process.env.PORT || 4000; // const options = {
//   key: fs.readFileSync('./keys/private.pem'),
//   cert: fs.readFileSync('./keys/public.pem')
// }

var handleListening = function handleListening() {
  console.log("\u2605Listening on: http://lcalhost:".concat(PORT));
};

_app["default"].listen(PORT, handleListening); // https.createServer(options, app).listen(PORT, function () {
//   console.log('HTTPS server listening on port' + PORT)
// })