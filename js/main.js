import TitleScreen from "./scenes/menu.js";
import TestWorld from "./scenes/test.js";

const total_width = 700//screen.width;//(window.innerWidth > 0) ? window.innerWidth : screen.width;
const total_height = window.innerHeight;//(window.innerHeight > 0) ? window.innerHeight : screen.height;

//scenes
var BootScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function BootScene ()
    {
        Phaser.Scene.call(this, { key: 'BootScene' });
    },
    preload: function ()
    {
        // load the resources here
    },
    create: function ()
    {
        //this.scene.start('WorldScene');
        this.scene.start('TitleScreen');
        //this.scene.start('TestWorld');
    }
});
var config = {
    type: Phaser.WEBGL,
    parent: 'content',
    width: 670,
    height: 290,
    zoom: 2,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [
        BootScene,
        TitleScreen,
        TestWorld
    ]
};
let game = new Phaser.Game(config);
console.log(total_height)