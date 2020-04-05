import Phaser, { GameObjects } from "phaser";

export default class TextButton extends Phaser.GameObjects.Container {
    mySocket;
    myScope;
    constructor(scene, x, y, text, style, _socket) {
        var text = new GameObjects.Text(scene, -40, -5, text, style.textStyle);
        var rectangle = new GameObjects.Rectangle(scene, 0,  0, 100, 40, style.recStyle.bgColor);
        if(style.recStyle.border) rectangle.setStrokeStyle(style.recStyle.border.width, style.recStyle.border.color);
        super(scene, x + 40, y + 5, [rectangle, text]);
        this.setSize(100, 40);
        this.setInteractive({ useHandCursor: true });  
        this.style = style;
        this.myScope = scene;
        this.mySocket = _socket;
        scene.add.existing(this);


        this.on('pointerup', this.pointerUp, this);
        this.on('pointerdown', this.pointerDown, this);
        this.on('pointerover', this.pointerOver, this);
        this.on('pointerout', this.pointerOut, this);


    }

    pointerUp(pointer) {
        this.mySocket.emit('room-click', {name : this.list[1].text, roomJoined : this.myScope.roomJoined});
    }

    pointerDown(pointer) {
      
    }

    pointerOver(pointer) {
        // console.log('over over over', this.list[1].text);
        this.list[0].setFillStyle(0x44ff44);
    }

    pointerOut(pointer) {
        // console.log('out out out');
        this.list[0].setFillStyle(this.style.recStyle.bgColor);
    }

  
}

// export default class TextButton extends Phaser.GameObjects.Text {
//     constructor(scene, x, y, text, style) {
//       super(scene, x, y, text, style);
//       console.log('x', x, 'y', y)
//       var r1 = scene.add.rectangle(x + 40, y + 5 , 100, 40, 0x6666ff);  
//       r1.setStrokeStyle(2, 0xefc53f);
//       this.setInteractive({ useHandCursor: true });
//     }
// }