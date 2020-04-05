import Phaser from "phaser";
import io from 'socket.io-client';

export default class SceneSocket  {
    constructor() {
        this.socket = io('http://localhost:5000');

        this.socket.on('connect', function() {
           console.log('SceneSocket Connected!');
        }); 
    }
}