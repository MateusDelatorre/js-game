//import { Phaser } from "../phaser";

export default class TitleScreen extends Phaser.Scene{
    constructor(){
        super('TitleScreen');
    }
    preload(){
        this.load.spritesheet('menuButton', 'assets/buttons_menu.png', { frameWidth: 300, frameHeight: 50 });
    }
    create(){
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

        //this.button1 = new Button(330, 100, 'menuButton', 0);
        this.button1 = this.add.existing(new MenuButton(this, 330, 100, function(scene) {
            console.log("func");
            scene.scene.start('TestWorld');
        }));
        this.button2 = this.add.existing(new MenuButton(this, 330, 160, function () {
            //this.scene.start('TestWorld');
        }));
        this.button3 = this.add.existing(new MenuButton(this, 330, 220, function () {
            //this.scene.start('TestWorld');
        }));
        
        var add = this.add;
        var input = this.input;

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

class MenuButton extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y, onClicked)
    {
        super(scene, x, y);

        this.setTexture('menuButton');
        this.setPosition(x, y);
        this.setFrame(0);
        this.setInteractive();
        console.log(onClicked);
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
