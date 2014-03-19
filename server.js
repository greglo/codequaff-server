var Client = require('./client');
var Lobby = require('./lobby');

var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express()
  , port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/'));

var server = http.createServer(app);
server.listen(port);

var lobbies = {};
lobbies[0] = new Lobby(0);


var wss = new WebSocketServer({server: server});
var nextId = 0;
wss.on('connection', function(ws) {
    var clientId = nextId++;
    var client = new Client(clientId, 0, ws);
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