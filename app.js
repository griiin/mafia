var express = require('express');
var app = express();
app.use('/', express.static('public'));

var server = app.listen(4000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Running at http://%s:%s', host, port);
});
var io = require('socket.io')(server);

var games = [];

var lastId = 0;
function getId() {
  lastId++;
  lastId %= 4000;
  return lastId;
};

function shuffle(input) {
    for (var i = input.length-1; i >=0; i--) {
        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemAtIndex = input[randomIndex];
        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}


io.on('connection', function(socket){
  socket.on('createGame', function (data) {
    console.log('=> createGame: ' + data);
    var max = parseInt(data.nbMafia) + parseInt(data.nbCitizen);
    var id = getId();
    var game = {
      currentPlayerNb: 0,
      maxPlayerNb: max,
      nbMafia: parseInt(data.nbMafia),
      nbCitizen: parseInt(data.nbCitizen),
      id: id,
      creator: socket,
      players: []
    };
    games[id] = game;
    socket.emit('createGameResult', {id: id, maxPlayerNb: max})
  });
  socket.on('joinGame', function (data) {
    console.log('=> joinGame: ', data);
    var id = data.gameId;
    var game = games[id];
    if (!game || !game.maxPlayerNb) {
      socket.emit('joinGameFailed', {message: 'Wrong code'});
      return;
    }
    if (game.currentPlayerNb >= game.maxPlayerNb) {
      socket.emit('joinGameFailed', {message: 'Game full'});
      return;
    }
    for (var key in game.players) {
      var player = game.players[key];
      if (player.name === data.name) {
        socket.emit('joinGameFailed', {message: 'Username already taken'});
        return;
      }
    }
    game.currentPlayerNb++;
    for (var key in game.players) {
      var player = game.players[key];
      player.socket.emit('newPlayer', {currentPlayerNb: game.currentPlayerNb, name: data.name});
    }
    game.creator.emit('newPlayer', {currentPlayerNb: game.currentPlayerNb, name: data.name})
    game.players.push({socket: socket, name: data.name});
    socket.emit('joinGameSuccess', {id: id, currentPlayerNb: game.currentPlayerNb, maxPlayerNb: game.maxPlayerNb});
    if (game.currentPlayerNb === game.maxPlayerNb) {
      var rPlayers = shuffle(game.players);
      var cMafia = game.nbMafia;
      var monitor = [];
      for (var i = 0; i < rPlayers.length; ++i) {
        var player = rPlayers[i];
        var role = 'citizen';
        if (cMafia > 0 ) {
          cMafia--;
          role = 'mafia';
        }
        monitor.push({name: player.name, role: role});
        console.log({name: player.name, role: role});
        player.socket.emit('startGame', {role: role});
      }
      game.creator.emit('startMonitorGame', {players: monitor});
    }
  });
  socket.on('disconnect', function () {
    console.log('Disconnection');
  })
  console.log("New connection");
});
