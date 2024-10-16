import Phaser, { Game } from "phaser";
//import Game from "./scenes/game";
import Login from "./scenes/login";
import Lobby from "./scenes/lobby";
import PreGame from "./scenes/pregame"
import MGame from "./scenes/game"
import End from "./scenes/end";
const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    dom:{
        createContainer:true
    },
    scene: [
        Login, Lobby, PreGame, MGame, End
    ],
    scale:{
        mode:Phaser.Scale.FIT,
    }
};

const game = new Phaser.Game(config);