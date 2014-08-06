function Client(clientId, name, lobbyId, ws) {
    this.clientId = clientId;
    this.lobbyId = lobbyId;
    this._ws = ws;
}

Client.prototype.sendString = function(str) {
    this._ws.send(str);
};

Client.prototype.sendJSON = function(json) {
    this.sendString(JSON.stringify(json));
};

exports.Client = Client;