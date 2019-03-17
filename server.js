const express = require("express");
const http = require("http");
const path = require("path");
const httpProxy = require("http-proxy");

const app = express();

const proxyServer = httpProxy.createServer({
  target: "https://nodetrainer.herokuapp.com",
  changeOrigin: true,
  ws: true
});

proxyServer.on("error", function(err) {
  console.trace(err);
});

app.use("/api", function(req, res) {
  proxyServer.web(req, res, {
    target: "https://nodetrainer.herokuapp.com/api"
  });
});

app.use(express.static(path.join(__dirname, "build")));
app.use("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

const port = process.env.PORT || 3001;
app.set("port", port);

var server = http.createServer(app);

server.on("listening", function() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
});

server.on("upgrade", function(req, socket, head) {
  proxyServer.ws(req, socket, head);
});

server.on("error", function(err) {
  console.log(err);
  console.log(err.trace);
});

server.listen(port);
