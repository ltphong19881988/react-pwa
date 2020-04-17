export default class Zone {
    constructor(scene) {
        this.renderZone = () => {
            // console.log(scene, scene.cameras.main);
            var mainWidth =scene.cameras.main.width ;
            var mainHeight =scene.cameras.main.height ;
            var height = mainHeight/4;
            var width = mainWidth/6;
            // console.log(width, height);
            let dropZone = scene.add.zone(width*3, height*2, width * 4 - 200 , height*2 - 50).setRectangleDropZone(width * 4 - 200, height * 2 - 50);
            dropZone.setData({ cards: 0 });
            return dropZone;
        };
        this.renderOutline = (dropZone) => {
            let dropZoneOutline = scene.add.graphics();
            dropZoneOutline.lineStyle(4, 0xff69b4);
            dropZoneOutline.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height)
        }
    }
}