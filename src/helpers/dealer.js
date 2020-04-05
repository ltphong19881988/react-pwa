import Phaser from "phaser";
import Card from './card';

export default class Dealer {
    constructor(scene) {
        this.dealCards = () => {
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
            for (let i = 0; i < 5; i++) {
                let playerCard = new Card(scene);
                playerCard.render(375 + (i * 100), height * 3.5, Phaser.Math.RND.pick(scene.frames));

                let opponentCard = new Card(scene);
                scene.opponentCards.push(opponentCard.render(375 + (i * 100), width*0.5 - 10, scene.frames[0]).disableInteractive());
            }
        }
    }
}