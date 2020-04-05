const server = require('express')();
const http = require('http').createServer(server);
const io = require('socket.io')(http);
let players = [];
let room = ['room 1', 'room 2'];
class RoomPlayer {
    constructor(){
        this.name = '';
        this.listPlayer = [];
    } 
}

let listRoomPlayer = [];
room.forEach(element => {
    var roomPlayer = new RoomPlayer();
    roomPlayer.name = element;
    listRoomPlayer.push(roomPlayer);
});

io.on('connection', function (socket) {
    
    console.log('A user connected: ' + socket.id);

    players.push(socket.id);

    if (players.length === 1) {
        io.emit('isPlayerA');
    };

    socket.on('listRoom', function(){
        io.emit('listRoom', {room: room});
    })

    socket.on('room-click', function (data) {
        console.log( socket.adapter.rooms[data.name]);
        socket.leave(data.roomJoined);
        socket.join(data.name);
        io.emit('roomJoined', data.name);
        console.log( socket.adapter.rooms[data.name]);
        if(socket.adapter.rooms[data.name] && socket.adapter.rooms[data.name].length == 2){
            io.to(data.name).emit('roomToGame');
        }
        // if(data.roomJoined != '' && room.indexOf(data.roomJoined) != -1){
        //     var index = listRoomPlayer[room.indexOf(data.roomJoined)].listPlayer.indexOf(socket.id);
        //     listRoomPlayer[room.indexOf(data.roomJoined)].listPlayer.splice(index, 1);
        //     // console.log( socket.adapter.rooms);
        // }
        // if(listRoomPlayer[room.indexOf(data.name)].listPlayer.indexOf(socket.id) == -1){
        //     listRoomPlayer[room.indexOf(data.name)].listPlayer.push(socket.id);
        //     // console.log( socket.adapter.rooms);
        // }
        
        // if(listRoomPlayer[room.indexOf(data.name)].listPlayer.length == 2) {
        //     io.emit('dealCards');
        // }
    });

    socket.on('gameInited', function () {
        io.emit('dealCards');
    });

    socket.on('cardPlayed', function (gameObject, roomJoined) {
        console.log(roomJoined, ' - ', socket.id);
        io.to(roomJoined).emit('cardPlayed', gameObject, socket.id);
    });

    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
        // socket.leave(data.roomJoined);
        players = players.filter(player => player !== socket.id);
    });
});

http.listen(80, function () {
    console.log('Server started!');
});