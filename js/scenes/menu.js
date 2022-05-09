//import { Phaser } from "../phaser";

export default class TitleScreen extends Phaser.Scene{
    constructor(){
        super('TitleScreen');
    }
    preload(){
        //Load the custom font
        this.load.spritesheet('menuButton', 'assets/buttons_menu.png', { frameWidth: 300, frameHeight: 50 });
    }
    create(){
        //This nexts lines will create the animation effect to be called later on
        this.anims.create({
            key: 'mouseover',//define the name of the animation
            frameRate: 7,//The fps of the animation
            frames: this.anims.generateFrameNumbers('menuButton', { frames: [0,1]}),//The frames that will be changed from left to right
            repeat: 0
        });
        this.anims.create({
            key: 'cliked',
            frameRate: 7,
            frames: this.anims.generateFrameNumbers('menuButton', { start: 1, end: 2}),
            repeat: 0
        });
        this.anims.create({
            key: 'mouseout',
            frameRate: 7,
            frames: this.anims.generateFrameNumbers('menuButton', { start: 1, end: 0}),
            repeat: 0
        });

        //Add a button passing as parameters a Sprite gameObject
        this.button1 = this.add.existing(new MenuButton(this, 330, 100, function(scene) {
            scene.scene.start('Village');//starts the a scene
        }));
        this.button2 = this.add.existing(new MenuButton(this, 330, 160, function () {
            //this.scene.start('TestWorld');
        }));
        this.button3 = this.add.existing(new MenuButton(this, 330, 220, function () {
            //this.scene.start('TestWorld');
        }));
        
        var add = this.add;

        WebFont.load({
        custom: {
            families: [ 'CompassGold']
        },
        active: function ()
        {
            add.text(265, 15, 'Main Menu', { fontFamily: 'CompassGold', fontSize: 30});
            add.text(300, 90, 'Start', { fontFamily: 'CompassGold', fontSize: 20});
            add.text(300, 150, 'Controls', { fontFamily: 'CompassGold', fontSize: 20});
            add.text(300, 210, 'Volume', { fontFamily: 'CompassGold', fontSize: 20});
        }
        
    });
    }

    update(){
        
    }
}
//A custom class to make the button used in menu
class MenuButton extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y, onClicked)
    {
        super(scene, x, y);

        this.setTexture('menuButton');
        this.setPosition(x, y);
        this.setFrame(0);
        this.setInteractive();
        this.on('pointerover', function (pointer) {
            this.anims.play('mouseover', true);
            //this.setTint(0xff0000);
        });
        this.on('pointerout', function (pointer) {
            this.anims.play('mouseout', true);
        });
        this.on('pointerdown', function (pointer) {
            this.anims.play('cliked', true);
            onClicked(scene);
        });
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        //this.rotation += 0.01;
    }
}

// function buttonFactory(scene, x, y, texture, frame) {
//     return {
//         scene: scene,
//         x: x,
//         y: y,
//         texture: texture,
//         frame: frame,
//         preUpdate (time, delta){
//             super.preUpdate(time, delta);
//             this.rotation += 0.01;}
//     }
// }
