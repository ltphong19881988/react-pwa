import React, { Component }  from "react";
import Phaser from "phaser";
import Game from "../scenes/game";
import SelectRoom from "../scenes/select-room";
import { IonPhaser } from '@ion-phaser/react'

const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: 1200,
    height: 700,
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
