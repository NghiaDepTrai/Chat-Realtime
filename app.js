const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.get("/", function (req, res) {
   res.render("Client");
});
users = [];
io.on('connection', function (socket) {
   console.log("A someone connected");
   socket.on('setUsername', function (data) {
      console.log(data);

      if (users.indexOf(data) > -1) {
         socket.emit('userExists', data + ' username is taken! Try some other username.');
      } else {
         users.push(data);
         socket.emit('userSet', { username: data });
      }
   });

   socket.on('msg', function (data) {
      //Send message to everyone
      console.log(data);
      io.sockets.emit('newmsg', data);
   })
});

server.listen(3000, function () {
   console.log('listening on localhost:3000');
});