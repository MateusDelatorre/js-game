import TitleScreen from "./scenes/menu.js"

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
    }
});

//Main menu


var WorldScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function WorldScene ()
    {
        Phaser.Scene.call(this, { key: 'WorldScene' });
    },
    preload: function ()
    {
        
    },
    create: function ()
    {
        // create your world here
        //this.add.image(400, 300, 'map');
    }
});
var config = {
    type: Phaser.AUTO,
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
        WorldScene,
        TitleScreen
    ]
};
let game = new Phaser.Game(config);
console.log(total_height)