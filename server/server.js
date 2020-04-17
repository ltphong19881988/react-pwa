const express = require('express');
const GameCards = require('./cards');
const SocRoom = require('./soc-room');
const SocPlayer = require('./soc-player');
// const path = require('path');
const server = express();
const http = require('http').createServer(server);
const io = require('socket.io')(http);

// server.use(express.static(path.join(__dirname, '../public')));
server.engine('html', require('ejs').renderFile);
server.set('view engine', 'html');
server.get('/', function(req, res){
    res.json('hello');
})




// let cards = [];
// Promise.all([Cards.LoadFrames()]).then(data=>{
//     console.log(data);
//     cards = data[0];
//     console.log(cards);
// });


let players = [];
let roomName = ['room 1', 'room 2'];

let gameCards = [];
let listRooms = {};
let listPlayers = {};
roomName.forEach(element => {
    listRooms[element] = new SocRoom(element) ;
});
// console.log(listRooms);

io.on('connection', function (socket) {
    
    console.log('A user connected: ' + socket.id);
    listPlayers[socket.id] = new SocPlayer(socket.id);
    players.push(socket.id);

    // if (players.length === 1) {
    //     io.emit('isPlayerA');
    // };

    socket.on('listRoom', function(){
        io.to(socket.id).emit('listRoom', {room: roomName});
    })

    socket.on('room-click', async function (data) {
        
        await socket.leave(data.roomJoined);
        console.log( socket.adapter.rooms[data.roomJoined]);
        var count = 0;
        if(socket.adapter.rooms[data.roomJoined]) {
            count = socket.adapter.rooms[data.roomJoined].length;
        }
        if(roomName.indexOf(data.roomJoined) != -1)
            io.emit('roomLeaved', roomName.indexOf(data.roomJoined), count, socket.id);
        
        if(listRooms[data.roomJoined] && listRooms[data.roomJoined].players.indexOf(socket.id) != -1) listRooms[data.roomJoined].players.splice(listRooms[data.roomJoined].players.indexOf(socket.id), 1);
        if(listPlayers[socket.id].rooms.indexOf(data.roomJoined) != -1) listPlayers[socket.id].rooms.splice(listPlayers[socket.id].rooms.indexOf(data.roomJoined), 1);

        await socket.join(data.name);
        listRooms[data.name].players.push(socket.id);
        listPlayers[socket.id].rooms.push(data.name);
        io.emit('roomJoined', data.name, roomName.indexOf(data.name), socket.adapter.rooms[data.name].length, socket.id);
        // console.log(socket.adapter.rooms, socket.adapter.rooms[data.name]);
        if(socket.adapter.rooms[data.name] && socket.adapter.rooms[data.name].length == 4){
            io.to(data.name).emit('roomToGame');
        }

    });

    socket.on('gameInited', function (roomJoined) {
        if(!io.sockets.adapter.rooms[roomJoined]) return;
        var clients = io.sockets.adapter.rooms[roomJoined].sockets;
        var abc = async() => {
            // if(!gameCards[roomJoined]){
                gameCards[roomJoined] = new GameCards();
            // }
            if(gameCards[roomJoined].decks.length == 0){
                listPlayers = await gameCards[roomJoined].LoadFrames(clients, listPlayers);
            }
                
            // console.log(gameCards[roomJoined]);
            console.log('gui di ne');
            io.to(socket.id).emit('dealCardsDone');
        }
        abc();
        
    });

    socket.on('getCards', function (roomJoined) {
        // var clients = io.sockets.adapter.rooms[roomJoined].sockets;
        // console.log(clients, Object.entries(clients));
        // var i = 0;
        console.log(listRooms[roomJoined]);
        io.to(socket.id).emit('getCards', listPlayers[socket.id].cards, listRooms[roomJoined].players);
    });

    socket.on('cardPlayed', function (gameObject, roomJoined) {
        // console.log(roomJoined, ' - ', socket.id);
        io.to(roomJoined).emit('cardPlayed', gameObject, socket.id);
    });

    socket.on('disconnecting', function(){
        var self = this;
        var rooms = Object.keys(self.rooms);
    
        rooms.forEach(function(room){
            self.to(room).emit('user left', self.id + 'left');
        });
    });

    socket.on('phongle', function(){
        console.log('phongle');
    })

    socket.on('disconnect', function () {
        console.log(listPlayers[socket.id].rooms);
        console.log(listRooms)
        if(listPlayers[socket.id].rooms.length > 0){
            var roomName = listPlayers[socket.id].rooms[0];
            listPlayers[socket.id].rooms = [];
            listRooms[roomName].players.splice(listRooms[roomName].players.indexOf(socket.id), 1);
            // console.log(roomName);
        }
        console.log('A user disconnected: ' + socket.id);
        // socket.leave(data.roomJoined);
        players = players.filter(player => player !== socket.id);
    });
});

http.listen(5000, function () {
    console.log('Server started!');
});