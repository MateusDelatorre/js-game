import TitleScreen from "./scenes/menu.js";
import Village from "./scenes/village.js";
import RoadToVillage from "./scenes/RoadToVillage.js";

//This is the first scene, I took her from some tutorial that was saying about preloading assets before you go to your game scene to prevent bugs, I think...
var BootScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function BootScene ()
    {
        Phaser.Scene.call(this, { key: 'BootScene' });//Just don't ask, really
    },
    preload: function (){
        // load the resources here
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    },
    create: function (){
        this.scene.start('TitleScreen');
    }
});

//This object(or at least I think is a object) is going to set some properties to your game
var config = {
    mode: 'production',//'production' : 'development'
    type: Phaser.WEBGL,//set what render engine you will use, the other option is the canvas engine
    parent: 'content',
    width: 670,
    height: 290,
    zoom: 2,
    pixelArt: true,
    physics: {
        default: 'arcade',//There are two types of physics in Phaser 3, arcade and Matter
        arcade: {
            gravity: { y: 0 },
            debug: false//This option outlines the body of objects on the physics engine also show its vector
        }
    },
    scene: [
        BootScene,
        TitleScreen,
        Village,
        RoadToVillage
    ]//All the scenes you will use must be here so the Phase Scene Manager can call then
};
let game = new Phaser.Game(config);//create a new game