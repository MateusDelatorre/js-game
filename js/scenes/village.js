//This class is my greatest cration here on phaser 3, until now...
import Player from '../entites/player.js';
import Enemies from '../entites/enemies.js';
import Projectile from '../entites/projectile.js';
import Bullets from "../entites/bullets.js";
import Skeleton from "../entites/skeleton.js";
import Goblin from "../entites/goblin.js";
export default class Village extends Phaser.Scene{
    constructor(){
        super('Village');
    }
    preload(){
        this.load.image('tile', 'assets/map/canari.png');
        this.load.tilemapTiledJSON('map', 'assets/map/village.json');
        this.load.spritesheet('player', 'assets/player/texture.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('goblin', 'assets/enemies/goblin.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('skeleton', 'assets/enemies/skeleton.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('arrow', 'assets/weapons/arrow.png', { frameWidth: 12, frameHeight: 5 });
    }
    create(){
        this.addMap();
        //this.player.setCollideWorldBounds(true);
        this.createEntites();
        this.spawnEnimes();
        this.addCollisions();
        this.cursors = this.input.keyboard.createCursorKeys();



        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;

        this.player.CreateAnims();
        this.addEvents();
        this.player.setWeapon('arrow');
    }

    //This class add a map to the game. Ps.: I don't know what all that code does and now I'm too afraid to ask :0
    addMap() {
        this.map = this.make.tilemap({ key: 'map' });//the key is the key of your json map
        this.tileset = this.map.addTilesetImage('base', 'tile');//the key is the same as the tileset image
        this.ground = this.map.createLayer('ground', this.tileset);//this is line define a layer of the tiled map
        this.houses = this.map.createLayer('house', this.tileset);//same
        this.houses.setCollisionByProperty({ collides: true });//make the layer collidable
        this.tree = this.map.createLayer('trees', this.tileset);
        this.tree.setCollisionByProperty({ collides: true });
        this.physics.world.bounds.width = this.map.widthInPixels;//set the world bound
        this.physics.world.bounds.height = this.map.heightInPixels;
    }

    createEntites() {
        this.player = new Player(this, 50, 100, 'player', 0);
        this.arrows = new Bullets(this, Projectile, 20);
        this.goblins = new Enemies(this, Goblin);
        this.skeltons = new Enemies(this, Skeleton);
    }

    spawnEnimes(){
        this.goblins.Spawn(100, 100, 'goblin', 3);
        this.skeltons.Spawn(200, 100, 'skeleton', 3);
        //this.goblins.Spawn(200, 100, 'goblin', 3);
        //this.goblins.Spawn(300, 100, 'goblin', 3);
    }

    //Just tell the Phaser Physics with objects will collide and what to do when this happens
    addCollisions(){
        this.physics.add.collider(this.player, this.houses);
        this.physics.add.collider(this.player, this.tree);
        //This function is like a for each
        Phaser.Actions.Call(this.goblins.getChildren(), (goblin) => {
            this.physics.add.collider(goblin, this.houses);
            this.physics.add.collider(goblin, this.tree);
        });
        this.physics.add.collider(this.goblins, this.arrows, (goblin, arrow) => {
            goblin.sufferDamage(arrow.getDamage());
            arrow.die();
        });
        Phaser.Actions.Call(this.skeltons.getChildren(), (goblin) => {
            this.physics.add.collider(goblin, this.houses);
            this.physics.add.collider(goblin, this.tree);
        });
        this.physics.add.collider(this.skeltons, this.arrows, (skelton, arrow) => {
            skelton.sufferDamage(arrow.getDamage());
            arrow.die();
        });
    }

    addEvents() {
        this.input.on('pointerup', (pointer) => {
            this.arrows.fireProjectile(this.player.x, this.player.y, pointer.worldX, pointer.worldY, 'arrow', 0);
        }, this);
        this.physics.world.on('worldbounds', (body) => {
            body.gameObject.die();
        });
    }

    update(){
        this.player.Update();
        if (this.cursors.space.isDown)
        {
            this.goblins.Spawn(this.player.x, this.player.y, 'goblin', 3);
        }
    }
}
