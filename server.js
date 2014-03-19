var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express()
  , port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/'));

var server = http.createServer(app);
server.listen(port);

console.log('http server listening on %d', port);

var wss = new WebSocketServer({server: server});

console.log('websocket server created');

wss.on('connection', function(ws) {
    console.log(ws);

    var id = setInterval(function() {
        ws.send(JSON.stringify(new Date()), function() {  });
    }, 5000);

    console.log('');

    ws.on('close', function() {
        console.log('websocket connection close');
        clearInterval(id);
    });

    ws.on('message', function(message) {
        console.log(message);
    });
});