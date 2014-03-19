var lo = require('./lobby');

function LobbySet() {
    this._lobbies = {};
}

LobbySet.prototype.createLobby = function(lobbyId) {
    var lobby = new lo.Lobby(lobbyId);
    this._lobbies[lobbyId] = lobby;
};

LobbySet.prototype.lobbyExists = function(lobbyId) {
    return lobbyId in this._lobbies;
};

LobbySet.prototype.getLobbyById = function(lobbyId) {
    return this._lobbies[lobbyId];
};

LobbySet.prototype.deleteLobby = function(lobbyId) {
    delete this._lobbies[lobbyId];
};

exports.LobbySet = LobbySet;