//Please ignore this entire file, it was my playground during my early days of Phaser 3
import Player from '../entites/player.js';
import Enemies from '../entites/enemies.js';
import Projectile from '../entites/projectile.js';
export default class TestWorld extends Phaser.Scene{
    constructor(){
        super('TestWorld');
    }
    preload(){
        this.load.image('tile', 'assets/map/canari.png');
        this.load.tilemapTiledJSON('map', 'assets/map/FirstMap.json');
        //this.load.atlas('player', 'assets/player/texture.png', 'assets/player/texture.json');
        this.load.spritesheet('player', 'assets/player/texture.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('goblin', 'assets/enemies/goblin.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('arrow', 'assets/weapons/arrow.png', { frameWidth: 12, frameHeight: 5 });
        this.load.image('mask', 'assets/luz.png');
    }
    create(){
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('FirstMap', 'tile');
        const ground = map.createLayer('ground', tileset);
        const rock = map.createLayer('rock', tileset);
        rock.setCollisionByProperty({ collides: true });

        // const debugGraphics = this.add.graphics().setAlpha(0.75);
        // rock.renderDebug(debugGraphics, {
        //     tileColor: null, // Color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });
        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;

        //this.player.setCollideWorldBounds(true);

        let spotlight = this.make.sprite({
            x: 2,
            y: 2,
            key: 'mask',
            add: false
        });
        spotlight.setOrigin(1, 0.5);
        this.physics.add.existing(spotlight);
        //spotlight.setFlipX(true);
        ground.mask = new Phaser.Display.Masks.BitmapMask(this, spotlight);
        this.input.on('pointermove', function (pointer) {

            let vectorX = spotlight.x - pointer.worldX;
            let vectorY = spotlight.y - pointer.worldY;
            // let vectorX = pointer.x - spotlight.x;
            // let vectorY = pointer.y - spotlight.y;
            // let angle = ((Math.atan(vectorY, vectorX)) * 180) / 3.14159;
            // spotlight.setAngle(angle);
            spotlight.setRotation(Math.atan2(vectorY, vectorX));

            //console.log(spotlight.angle);
            // console.log(spotlight.x);
            // console.log(spotlight.y);
            
            //spotlight.x = pointer.x;
            //spotlight.y = pointer.y;
        });
        //this.flashlight = spotlight;

        this.player = new Player(this, 50, 100, 'player', 0, spotlight);
        this.physics.add.collider(this.player, rock);
        this.cursors = this.input.keyboard.createCursorKeys();
        //this.goblin = new Enemies(this, 300, 100, 'goblin', 3);
        //this.physics.add.collider(this.goblin, rock);
        //this.physics.add.collider(this.goblin, this.player);

        // this.goblins = this.add.group({
        //     classType: Enemies,
        //     maxSize: 3,
        //     runChildUpdate: true
        // });

        // this.goblins.add(new Enemies(this, 300, 100, 'goblin', 3));
        // this.goblins.add(new Enemies(this, 100, 100, 'goblin', 3));
        // this.goblins.add(new Enemies(this, 200, 100, 'goblin', 3));

        this.goblinsArray = [];
        this.goblinsArray.push(new Enemies(this, 300, 100, 'goblin', 3));
        this.goblinsArray.push(new Enemies(this, 100, 100, 'goblin', 3));
        this.goblinsArray.push(new Enemies(this, 200, 100, 'goblin', 3));

        this.goblinsArray.forEach(goblin =>{
            this.physics.add.collider(goblin, rock);
            //goblin.mask = new Phaser.Display.Masks.BitmapMask(this, spotlight);
            this.physics.add.collider(goblin, spotlight, function (goblin, spotlight) {
                goblin.setPosition(500, 500);
                // goblin.setActive(false);
                // goblin.setVisible(false);
                //console.log("colission");
            });
        
            //this.physics.add.collider(goblin, this.player);
        });

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;

        //this.player.anims.play('test', true);
        this.player.CreateAnims();

        
        this.add.text(300, 210, 'Vida:');
        this.vida = this.add.text(350, 210, '100');
        
        // this.graphics = this.add.graphics();

        // this.graphics.lineStyle(20, 0xFF0000, 1);
        // this.graphics.moveTo(100, 100);
        // this.graphics.lineTo(200, 200);
        this.line = this.add.line(100, 200, 0, 0, 140, 0, 0x6666ff);
        this.line.visible = false;

        //arrow logic
        this.arrows = this.physics.add.group({
            key: 'arrow',
            classType: Projectile,
            collideWorldBounds: true,
            active: false,
            visible: false,
            runChildUpdate: true,
            frameQuantity: 5,
            maxSize: 5
        });
        //this.arrows = [];
        // this.arrows = this.physics.add.group({ classType: Projectile, runChildUpdate: true })

        this.input.on('pointerup', function (pointer) {
            //this.arrows.push(new Projectile(this, this.player.x, this.player.y, 'arrow', pointer.worldX, pointer.worldY, this.id));
            this.arrows.getFirstDead(true, this.player.x, this.player.y, 'arrow', 0, true);
        }, this);

        //this.physics.world.on('worldbounds', bulletDestroy(body));
        // this.physics.world.on('worldbounds', (body) => {
        //     body.destroy();
        //     //console.log(body);
        // });
        this.physics.world.on('worldbounds', (body) => {
            //this.bulletDestroy(body);
            //console.log(body);
            // let index = this.arrows.indexOf(body);
            // this.arrows[index].destroy
            //console.log(body);
            //body.setVisible(false);
            //body.setActive(false);
            //this.arrows.pop(this.arrows.indexOf(body));
            //body.destroy();
            console.log(body);
            let arrow = body.gameObject;
            arrow.destroy();
            // arrow.setActive(false);
            // arrow.setVisible(false);
        });
    }

    createPlayer(){

    }

    update(){
        this.player.Update();
        // 
        //this.goblin.Update(this.player.x, this.player.y);
        this.goblinsArray.forEach(goblin =>{
            //goblin.Update(this.player.x, this.player.y);
            this.physics.moveToObject(goblin, this.player, 10);
            if (goblin.visible) {
                //console.log("visible");
            }
        });
        // Phaser.Actions.Call(this.arrows.getChildren(), function (arrow) {
        //     arrow.update();
        // });
        // this.arrows.forEach(arrow =>{
        //     arrow.update();
        //     console.log(arrow.vectorX);
        // });
        //let test = this.player.body.touching;
        // if (test) {
        //     console.log(true);
        // }
    }
}
