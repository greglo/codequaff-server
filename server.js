var cl = require('./models/client');
var ls = require('./models/lobbyset');

var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express()
  , port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/'));

var server = http.createServer(app);
server.listen(port);

var lobbySet = new ls.LobbySet();


var wss = new WebSocketServer({server: server});
var nextId = 0;
wss.on('connection', function(ws) {
    var clientId = nextId++;
    var lobbyId = 0;
    var generatedName = 'Greg'

    if (!lobbySet.lobbyExists(lobbyId)) {
        lobbySet.createLobby(lobbyId);
    }
    var lobby = lobbySet.getLobbyById(lobbyId);
    var client = new cl.Client(clientId, generatedName, 0, ws);
    client.sendString("Your username is: " + generatedName)

    ws.on('close', function() {
        console.log(clientId + ' closed their connection');
        lobby.removeClientById(clientId);
        if (lobby.getSize() < 1) {
            console.log("Removing lobby id: " + lobby.lobbyId);
            lobbySet.removeLobby(lobby.lobbyId);
        } else {
            lobby.broadcastString(clientId + " left the lobby");
        }
    });

    ws.on('message', function(message) {
        console.log(client.clientId + ": " + message);
        lobby.broadcastString(clientId + " said: " + message);
    });
});