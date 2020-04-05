export default class Card {
    constructor(scene) {
        this.render = (x, y, sprite) => {
            let card = scene.add.image(x, y, 'cards', sprite).setScale(0.8, 0.8).setInteractive();
            scene.input.setDraggable(card);
            return card;
        }
    }
}