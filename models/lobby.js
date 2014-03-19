function Lobby(lobbyId) {
    this.lobbyId = lobbyId;
    this._clients = {};
}

Lobby.prototype.addClient = function(client) {
    var id = client.clientId;
    this._clients[id] = client;
};

Lobby.prototype.removeClientById = function(clientId) {
    delete this_clients[clientId];
};

exports.Lobby = Lobby;