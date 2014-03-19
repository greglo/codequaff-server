var cl = require('./client');
var lo = require('./lobby');

var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express()
  , port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/'));

var server = http.createServer(app);
server.listen(port);

var lobbies = {};
console.log(lo);
console.log(lo.Lobby);
lobbies[0] = new lo.Lobby(0);


var wss = new WebSocketServer({server: server});
var nextId = 0;
wss.on('connection', function(ws) {
    var clientId = nextId++;
    var client = new cl.Client(clientId, 0, ws);
    var lobby = lobbies[0];

    console.log(client);
    console.log(lobby);

    ws.on('close', function() {
        console.log(client.clientId + ' closed their connection');
    });

    ws.on('message', function(message) {
        console.log(client.clientId + ": " + message);
    });
});