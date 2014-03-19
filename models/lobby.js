function Lobby(lobbyId) {
    this.lobbyId = lobbyId;
    this._clients = {};
    this._size = 0;
}

Lobby.prototype.addClient = function(client) {
    var id = client.clientId;

    if (!(id in this._clients)) {
        this._size++;
    }

    this._clients[id] = client;
};

Lobby.prototype.removeClientById = function(clientId) {
    if (!(id in this._clients)) {
        delete this._clients[clientId];
        this._size--;
    }
};

Lobby.prototype.getSize = function() {
    return this._size;
};

Lobby.prototype.broadcastString = function(str) {
    for (var clientId in this._clients) {
        var client = this._clients[clientId];
        client.sendString(str);
    }   
};

exports.Lobby = Lobby;