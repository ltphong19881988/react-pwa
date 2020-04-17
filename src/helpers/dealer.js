import Phaser from "phaser";
import Card from './card';

export default class Dealer {
    constructor(scene) {
        this.dealCards = (listCards) => {
            var mainWidth =scene.cameras.main.width ;
            var mainHeight =scene.cameras.main.height ;
            var height = mainHeight/4;
            var width = mainWidth/6;
            let playerSprite;
            let opponentSprite;
            // var frames = scene.textures.get('cards').getFrameNames();
            // console.log(scene.frames);
            if (scene.isPlayerA) {
                playerSprite = 'cyanCardFront';
                opponentSprite = 'magentaCardBack';
            } else {
                playerSprite = 'magentaCardFront';
                opponentSprite = 'cyanCardBack';
            };
            for (let i = 0; i < listCards.length; i++) {
                let playerCard = new Card(scene);
                playerCard.render(width + 100 + (i * 20), height * 3.5, listCards[i], 0);
                let opponentCard = new Card(scene);
                scene.opponentCards[1].push(opponentCard.render(width - 50 , width*1  + (i * 10), scene.frames[0], 90).disableInteractive());
                scene.opponentCards[2].push(opponentCard.render(width + 100 + (i * 20), width*0.5 - 10, scene.frames[0], 180).disableInteractive());
                scene.opponentCards[3].push(opponentCard.render(width + 500 , width*1  + (i * 10), scene.frames[0], 270).disableInteractive());
            }
        }
    }
}