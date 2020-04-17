import Phaser from "phaser";
import io from 'socket.io-client';
import Card from '../helpers/card';
import Dealer from "../helpers/dealer";
import Zone from '../helpers/zone';
import TextButton from '../helpers/text-button';

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    init (data){
        this.socket = data.socket;
        this.roomJoined = data.roomJoined;
        this.playerName = data.playerName;
        
        // console.log(this.socket.id);
    }

    preload() {
        console.log(process.env.PUBLIC_URL);
        this.load.atlas('cards', 'assets/atlas/cards.png', 'assets/atlas/cards.json');
        this.load.image('cyanCardFront',  '/assets/CyanCardFront.png');
        this.load.image('cyanCardBack', '/assets/CyanCardBack.png');
        this.load.image('magentaCardFront',  '/assets/magentaCardFront.png');
        this.load.image('magentaCardBack', '/assets/magentaCardBack.png');
    }

    create() {
        this.frames = this.textures.get('cards').getFrameNames();
        // console.log(this.frames);
        
        this.opponentCards = [[],[],[],[]];
        this.listPlayers = [];
        this.listRoomBtn = [];

        this.zone = new Zone(this);
        this.dropZone = this.zone.renderZone();
        this.outline = this.zone.renderOutline(this.dropZone);

        this.dealer = new Dealer(this);

        let self = this;

        

        this.socket.emit('gameInited', this.roomJoined);

        this.socket.on('isPlayerA', function() {
            self.isPlayerA = true;
        })

        this.socket.on('dealCardsDone', function() {
            self.socket.emit('getCards', self.roomJoined);
        })

        this.socket.on('getCards', function(listCards, listPlayers) {
            console.log(listPlayers.indexOf(self.socket.id));
            self.listPlayers.push(self.socket.id);
            var myIndex = listPlayers.indexOf(self.socket.id);
            for(var i = myIndex + 1; i < listPlayers.length; i++){
                self.listPlayers.push(listPlayers[i]);
            }
            for(var i = 0; i < myIndex; i ++){
                self.listPlayers.push(listPlayers[i]);
            }
            self.dealer.dealCards(listCards);
            console.log(self.listPlayers, listPlayers);
            // self.dealText.disableInteractive();
        })

        this.socket.on('cardPlayed', function(gameObject, player) {
            // console.log(player, self.socket.id);
            var pIndex = self.listPlayers.indexOf(player);
            
            if (self.socket.id !== player) {
                let sprite = gameObject.frameKey;
                console.log(gameObject);
                self.opponentCards[pIndex].shift().destroy();
                self.dropZone.data.values.cards++;
                console.log(self.dropZone.data.values.cards);
                let card = new Card(self);
                card.render(((self.dropZone.x - 150) + (self.dropZone.data.values.cards * 20)), (self.dropZone.y), sprite, 0).disableInteractive();
            }
        })
        
        this.socket.on("disconnect", function(){
            self.socket.emit('phongle');
            console.log("client disconnected from server");
        });

        // this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();

        // this.dealText.on('pointerdown', function() {
        //     self.socket.emit("dealCards");
        // })

        // this.dealText.on('pointerover', function() {
        //     self.dealText.setColor('#ff69b4');
        // })

        // this.dealText.on('pointerout', function() {
        //     self.dealText.setColor('#00ffff');
        // })

        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })

        this.input.on('dragstart', function(pointer, gameObject) {
            gameObject.setTint(0xff69b4);
            self.children.bringToTop(gameObject);
        })

        this.input.on('dragend', function(pointer, gameObject, dropped) {
            gameObject.setTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

        this.input.on('drop', function(pointer, gameObject, dropZone) {
            dropZone.data.values.cards++;
            gameObject.x = (dropZone.x - 150) + (dropZone.data.values.cards * 20);
            gameObject.y = dropZone.y;
            gameObject.disableInteractive();
            console.log(self.roomJoined );
            self.socket.emit('cardPlayed', gameObject, self.roomJoined);
        })

        function actionOnClick () {
            this.dealText.visible =! this.dealText.visible;
        }
    }

    update() {

    }
}