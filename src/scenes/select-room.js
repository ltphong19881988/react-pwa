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
        this.socket = io('http://45.77.44.244:5000');
        console.log(this.socket);
        this.socket.on('connect', function() {
            // console.log('selectt room socket Connected!');
            this.emit('listRoom');
        }); 
    }

    preload() {
        // console.log(process.env.PUBLIC_URL);
        // this.load.image('cyanCardFront',  '/assets/CyanCardFront.png');
        // this.load.image('cyanCardBack', '/assets/CyanCardBack.png');
        // this.load.image('magentaCardFront',  '/assets/magentaCardFront.png');
        // this.load.image('magentaCardBack', '/assets/magentaCardBack.png');
    }

    create() {
        this.roomJoined = '';
        this.isPlayerA = false;
        // this.opponentCards = [];
        this.listRoomBtn = [];
            
        let self = this;

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
                self.listRoomBtn[key] = new TextButton(self, 100 + 120*key, 100, value, style, self.socket);
                // console.log(self.listRoomBtn[key]);
            });
            // self.clickButton = new TextButton(self, 100, 100, 'Click me!', { fill: '#0f0'});
            // self.add.existing(self.clickButton);
        })

        this.socket.on('roomJoined', function(name){
            self.roomJoined = name;
        })

        this.socket.on('isPlayerA', function() {
            self.isPlayerA = true;
        })

        this.socket.on('roomToGame', function() {
            console.log('start game');
            self.scene.start('Game', {socket: self.socket, roomJoined: self.roomJoined});
        })
        
        
    }

    update() {

    }
}