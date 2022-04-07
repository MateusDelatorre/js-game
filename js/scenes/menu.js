//import { Phaser } from "../phaser";

export default class TitleScreen extends Phaser.Scene{
    constructor(){
        super('TitleScreen');
        let button1;
    }
    preload(){
        this.load.spritesheet('menuButton', 'assets/buttons_menu.png', { frameWidth: 300, frameHeight: 50 });
    }
    create(){
        this.button1 = this.physics.add.sprite(330, 100, 'menuButton', 0).setInteractive();
        this.anims.create({
            key: 'mouseover',
            frameRate: 7,
            frames: this.anims.generateFrameNumbers('menuButton', { frames: [0,1]}),
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

        this.button1.on('pointerover', function (pointer) {
            this.anims.play('mouseover', true);
            //this.setTint(0xff0000);
        });
        this.button1.on('pointerout', function (pointer) {
            this.anims.play('mouseout', true);
        });
        this.button1.on('pointerdown', function (pointer) {
            this.anims.play('cliked', true);
        });
        this.add.text(300, 15, 'Main Menu');
        this.add.text(300, 90, 'Start');
        this.add.text(300, 120, 'Controls');
        this.add.text(300, 150, 'Volume');
        // this.input.on('pointerout', function (event, gameObjects) {
        //     gameObjects[0].clearTint();
        // });
        
    }

    update(){
        
    }
}
