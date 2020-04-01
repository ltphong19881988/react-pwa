import React, { Component }  from "react";
import Phaser from "phaser";
import Game from "../scenes/game";
import { IonPhaser } from '@ion-phaser/react'

const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: 1280,
    height: 780,
    scene: [
        Game
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
