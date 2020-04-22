import React, { Component }  from "react";
import Phaser from "phaser";
import Game from "../scenes/game";
import SelectRoom from "../scenes/select-room";
import { IonPhaser } from '@ion-phaser/react'

const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    // width: 667,
    // height: 375,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1100,
        height: 600
    },
    dom: {
        createContainer: true
    },
    scene: [
        SelectRoom, Game
    ]
};


class GameView extends React.Component {    
  
    render() {
        return (
            <IonPhaser game={config} />
          )
    }
}

export {GameView}
