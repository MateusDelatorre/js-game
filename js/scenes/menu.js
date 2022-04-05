//import { Phaser } from "../phaser";

export default class TitleScreen extends Phaser.Scene{
    constructor(){
        super('TitleScreen')
    }
    preload(){
        this.load.image('tile', 'assets/map/canari.png');
        this.load.tilemapTiledJSON('map', 'assets/map/FirstMap.json');
        //this.load.atlas('player', 'assets/player/texture.png', 'assets/player/texture.json');
        this.load.spritesheet('player', 'assets/player/texture.png', { frameWidth: 16, frameHeight: 16 });
    }
    create(){
        //this.add.image(0, 0, 'map');
        this.add.text(10, 15, 'Menu');
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('FirstMap', 'tile');
        map.createLayer('ground', tileset);
        const rock = map.createLayer('rock', tileset);
        rock.setCollisionByProperty({ collides: true });

        const debugGraphics = this.add.graphics().setAlpha(0.75);
        rock.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });

        this.player = this.physics.add.sprite(50, 100, 'player', 6);
        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, rock);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;


        //animation
        this.anims.create({
            key: 'test',
            frameRate: 7,
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3}),
            repeat: -1
        });
    
        
        // animation with key 'right'
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 6, 0, 12 ] }),
            frameRate: 10,
            repeat: -1
        });
        this.player.anims.play('test', true);
    }

    update(){
        this.player.body.setVelocity(0);
        // Horizontal movement
        if (this.cursors.left.isDown)
        {
            this.player.body.setVelocityX(-80);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.setVelocityX(80);
        }
        // Vertical movement
        if (this.cursors.up.isDown)
        {
            this.player.body.setVelocityY(-80);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.body.setVelocityY(80);
        }    
    }
}
