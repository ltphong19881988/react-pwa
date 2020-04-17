export default class Card {
    constructor(scene) {
        this.render = (x, y, sprite, angle) => {
            let card = scene.add.image(x, y, 'cards', sprite).setScale(0.5, 0.5).setInteractive();
            card.angle += angle;
            scene.input.setDraggable(card);
            return card;
        }
    }
}