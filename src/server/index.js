var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.get('/', function (req, res) {
    res.send('<h2>Hello world</h2>');

});
io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('chat message', function (message) {
        console.log('message1', JSON.stringify(message));
        io.emit('chat message', message);
    });
});

http.listen(3001, function () {
    console.log('listening on 3001');
});