const path = require("path");
const spawn = require("child_process").spawn;

require("dotenv").config({ path: path.join("config.env") });
const mongoose = require("mongoose");
const colors = require("colors");

colors.enable();

const app = require("./app");
const database = require("./db");

// connect to database
mongoose
  .connect(database.url, { ...database.options })
  .then((con) => {
    console.log(
      colors.green.bold.bgBrightWhite(
        "  🔆🔆🔆    DATABASE CONNECTED SUCCESSFULLY  🔆🔆🔆    "
      )
    );
  })
  .catch((err) => {
    console.log(
      "   ⛔⛔⛔   DATABASE CONNECT FAILED!!!   ⛔⛔⛔".brightWhite.bold
        .bgBrightRed
    );
    console.log(err);
  });

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(
    `  🔆🔆🔆    Server runs on port: ${port}   🔆🔆🔆`.green.bold.bgBrightWhite
  );
  console.log(
    `   🛃🛃🛃   RUNNING ON MODE: ${process.env.NODE_ENV}    🛃🛃🛃`.green.bold
      .bgBrightWhite
  );
});

spawn("ffmpeg", ["-h"]).on("error", function (m) {
  console.error(
    "FFMpeg not found in system cli; please install ffmpeg properly or make a softlink to ./!"
  );
  process.exit(-1);
});

const io = require("socket.io")(server, {
  cors: "*",
});

io.on("connect", (socket) => {
  socket.on("broadcaster", () => {
    broadcaster = socket.id;
    socket.broadcast.emit("broadcaster");
  });
  socket.on("watcher", () => {
    socket.to(broadcaster).emit("watcher", socket.id);
  });
  socket.on("offer", (id, message) => {
    socket.to(id).emit("offer", socket.id, message);
  });
  socket.on("answer", (id, message) => {
    socket.to(id).emit("answer", socket.id, message);
  });
  socket.on("candidate", (id, message) => {
    socket.to(id).emit("candidate", socket.id, message);
  });
  socket.on("disconnect", () => {
    socket.to(broadcaster).emit("disconnectPeer", socket.id);
  });
});

let broadcaster;

// io.sockets.on("connection", socket => {
//   socket.on("broadcaster", () => {
//     broadcaster = socket.id;
//     socket.broadcast.emit("broadcaster");
//   });
//   socket.on("watcher", () => {
//     socket.to(broadcaster).emit("watcher", socket.id);
//   });
//   socket.on("disconnect", () => {
//     socket.to(broadcaster).emit("disconnectPeer", socket.id);
//   });
// });
