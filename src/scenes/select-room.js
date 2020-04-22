import Phaser from "phaser";
import io from 'socket.io-client';
import Card from '../helpers/card';
import Dealer from "../helpers/dealer";
import Zone from '../helpers/zone';
import TextButton from '../helpers/text-button';
import Game from "./game";

export default class SelectRoom extends Phaser.Scene {
    constructor() {
        super({
            key: 'SelectRoom'
        });
        this.socket = io('http://207.148.121.192:5000');
        // this.socket = io('http://localhost:5000');
        this.socket.on('connect', function() {
            // console.log('selectt room socket Connected!');
            this.emit('listRoom');
        }); 
    }

    preload() {
        this.load.html('nameform', 'assets/text/nameform.html');
        // console.log(process.env.PUBLIC_URL);
        // this.load.image('cyanCardFront',  '/assets/CyanCardFront.png');
        // this.load.image('cyanCardBack', '/assets/CyanCardBack.png');
        // this.load.image('magentaCardFront',  '/assets/magentaCardFront.png');
        // this.load.image('magentaCardBack', '/assets/magentaCardBack.png');
    }

    create() {
        this.roomJoined = '';
        this.playerName = '';
        // this.opponentCards = [];
        this.listRoomBtn = [];
            
        let self = this;

        var element = this.add.dom(300, 40).createFromCache('nameform');
        element.addListener('click');
        element.on('click', function (event) {

            if (event.target.name === 'playButton')
            {
                var inputText = this.getChildByName('nameField');
                window.location.href = '/home';
                //  Have they entered anything? 
                if (inputText.value !== '')
                {
                    self.playerName = inputText.value;
                    console.log(self.playerName);
                }
                else
                {

                }
            }
    
        });

        if(this.socket.connected){
            // console.log('Game Connected!');
            this.socket.emit('listRoom');
        }else{
            // console.log('hu hu hu');
        }
        
        this.socket.on('listRoom', function(data){
            data.room.forEach((value, key) => {
                // console.log(key, value);
                var style = {
                    textStyle : { fill: '#000'}, 
                    recStyle : {
                        bgColor : '0x6666ff',
                        border : {width: 2, color: '0xefc53f'},
                    }
                    
                };
                self.listRoomBtn[key] = new TextButton(self, 100 + 150*key, 100, value, style, self.socket);
                // console.log(self.listRoomBtn[key]);
            });
            // self.clickButton = new TextButton(self, 100, 100, 'Click me!', { fill: '#0f0'});
            // self.add.existing(self.clickButton);
        })

        this.socket.on('roomJoined', function(name, index, players, id){
            self.roomJoined = name;
            self.listRoomBtn[index].setCountPlayers(players);
            if(self.socket.id == id){
                self.listRoomBtn[index].setSelectedRectangle();
            }
        })

        this.socket.on('roomLeaved', function(index, players, id){
            // console.log('leave', index, players);
            self.listRoomBtn[index].setCountPlayers(players);
            if(self.socket.id == id){
                self.listRoomBtn[index].removeSelectedRectangle();
            }
        });


        this.socket.on('roomToGame', function() {
            console.log('start game');
            self.scene.start('Game', {socket: self.socket, roomJoined: self.roomJoined, playerName: self.playerName});
        })
        
        
    }

    update() {

    }
}