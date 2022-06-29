//This class is my greatest cration here on phaser 3, until now...
import Player from '../entites/player.js';
import Enemies from '../entites/enemies.js';
import Projectile from '../entites/projectile.js';
import Bullets from "../entites/bullets.js";
import Skeleton from "../entites/skeleton.js";
import Goblin from "../entites/goblin.js";
import NPC from "../entites/NPC.js";
export default class Village extends Phaser.Scene{
    constructor(){
        super('Village');
    }

    init(){
        this.storage = JSON.parse(localStorage.getItem("data"));
    }

    preload(){
        this.load.image('Outdoors-Tileset', 'assets/map/16x16-Outdoors-Tileset.png');
        this.load.image('162-tileset', 'assets/map/162-tileset-spritesheet.png');
        this.load.image('mythril-Ground-tile', 'assets/map/mythril-age-A2_Ground.png');
        this.load.image('mythril-OutSide_Nature-tile', 'assets/map/mythril-age-C_OutSide_Nature.png');
        this.load.tilemapTiledJSON('map', 'assets/map/JsonMap/village.json');
        this.load.spritesheet('player', 'assets/player/texture.png', { frameWidth: 15, frameHeight: 20 });
        this.load.spritesheet('goblin', 'assets/enemies/big-demon.png', { frameWidth: 22, frameHeight: 31 });
        this.load.spritesheet('wizzard', 'assets/entites/wizzard.png', { frameWidth: 17, frameHeight: 10 });
        this.load.spritesheet('skeleton', 'assets/enemies/big-zombie.png', { frameWidth: 22, frameHeight: 31 });
        this.load.spritesheet('arrow', 'assets/weapons/arrow.png', { frameWidth: 21, frameHeight: 7 });
    }
    create(){
        this.text = [null, null, null];
        this.addMap();
        if (this.storage.RoadToVillage.levelCleared)
            this.mapLevel2();
        else
            this.mapLevel1();

        this.createEntites();
        this.spawnEnimes();
        this.addCollisions();
        this.CollsionLevel = 1;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;

        this.player.CreateAnims();
        this.addEvents();
        this.player.setWeapon('arrow');
        this.isTalking = false;
        this.createText();
        //this.scene.run('Level1', this.player);
    }

    createText() {
        this.text[0] = this.add.text(0, 200, "", {
            backgroundColor: '#4287f5',
            padding: {
                left: 5,
                top: 5
            },
            fontSize: 10,
            wordWrapWidth: {width: 200}
        }).setVisible(false).setScrollFactor(0);
        let aux = 0
        for (let i = 1; i < 3; i++, aux += 40){
            this.text[i] = this.add.text(0 + aux, 225, "", {
                backgroundColor: '#4287f5',
                padding: {
                    left: 5,
                    top: 5
                },
                fontSize: 10,
                wordWrapWidth: {width: 200}
            }).setVisible(false).setScrollFactor(0);
        }
    }

    //This class add a map to the game. Ps.: I don't know what all that code does and now I'm too afraid to ask :0
    addMap() {
        this.map = this.make.tilemap({ key: 'map' });//the key is the key of your json map
        this.tileset1 = this.map.addTilesetImage('mythril-age-A2_Ground', 'mythril-Ground-tile');//the key is the same as the tileset image
        this.tileset2 = this.map.addTilesetImage('162-tileset-spritesheet', '162-tileset');
        this.tileset3 = this.map.addTilesetImage('mythril-age-C_OutSide_Nature', 'mythril-OutSide_Nature-tile');
        this.tileset4 = this.map.addTilesetImage('16x16-Outdoors-Tileset', 'Outdoors-Tileset');
        this.ground1 = this.map.createLayer('ground1', this.tileset1);//this is line define a layer of the tiled map
        this.ground2 = this.map.createLayer('ground2', [this.tileset2, this.tileset3]);//this is line define a layer of the tiled map
        this.trees1 = this.map.createLayer('trees1', this.tileset3);//this is line define a layer of the tiled map
        this.trees2 = this.map.createLayer('trees2', this.tileset3);//this is line define a layer of the tiled map
        this.bush1 = this.map.createLayer('bush1', this.tileset3);//this is line define a layer of the tiled map
        this.bush2 = this.map.createLayer('bush2', this.tileset3);//this is line define a layer of the tiled map
        this.houses1 = this.map.createLayer('houses1', this.tileset2);//same
        this.houses2 = this.map.createLayer('houses2', this.tileset2);//same
        this.next_level = this.map.createLayer('next_level', this.tileset4);//same

        this.physics.world.bounds.width = this.map.widthInPixels;//set the world bound
        this.physics.world.bounds.height = this.map.heightInPixels;
    }

    mapLevel1(){
        //set others levels invisible
        this.ground2.setVisible(false);
        this.trees2.setVisible(false);
        this.bush2.setVisible(false);
        this.houses2.setVisible(false);
        this.next_level.setVisible(false);

        //Set layer visiable
        this.ground1.setVisible(true);
        this.trees1.setVisible(true);
        this.bush1.setVisible(true);
        this.houses1.setVisible(true);

        this.next_level.setCollisionByProperty({ collides: true });//make the layer callable
        this.trees1.setCollisionByProperty({ collides: true });//make the layer callable
        this.houses1.setCollisionByProperty({ collides: true });//make the layer callable
    }

    mapLevel2(){
        //set others levels invisible
        this.trees1.setVisible(false);
        this.bush1.setVisible(false);

        //Set layer visiable
        this.ground1.setVisible(true);
        this.houses1.setVisible(true);

        this.ground2.setVisible(true);
        this.trees2.setVisible(true);
        this.bush2.setVisible(true);
        this.houses2.setVisible(true);

        //remove Collision
        //this.trees1.setCollisionByProperty({ collides: false });//make the layer callable

        //adds collision
        this.next_level.setCollisionByProperty({ collides: true });//make the layer callable
        this.trees2.setCollisionByProperty({ collides: true });//make the layer callable
        this.houses2.setCollisionByProperty({ collides: true });//make the layer callable

    }

    createEntites() {
        this.player = new Player(this, this.storage.Player.spawn_x, this.storage.Player.spawn_y, 'player', 0);
        this.arrows = new Bullets(this, Projectile, this.storage.Player.damage);
        this.npc = new NPC(this, 375, 248, 'wizzard', 0);
        this.npc.setPushable(false);
        //this.npc.setImmovable(true);
        // this.goblins = new Enemies(this, Goblin);
        // this.skeltons = new Enemies(this, Skeleton);
    }

    spawnEnimes(){
        //this.goblins.Spawn(200, 100, 'goblin', 3);
        //this.goblins.Spawn(300, 100, 'goblin', 3);
    }

    //Just tell the Phaser Physics with objects will collide and what to do when this happens
    addCollisions(){
        // this.physics.add.collider(this.player, this.houses1);
        // this.physics.add.collider(this.player, this.houses2);
        // this.physics.add.collider(this.player, this.trees1);
        // this.physics.add.collider(this.player, this.trees2);

        this.physics.add.collider(this.player, this.next_level, () => {
            this.events.off('pointerdown');
            this.events.off('worldbounds');
            this.storage.Player.spawn_x = 381;
            this.storage.Player.spawn_y = 772;
            localStorage.setItem("data", JSON.stringify(this.storage));
            this.scene.start('RoadToVillage');
        });

        //This function is like a for each
        // Phaser.Actions.Call(this.goblins.getChildren(), (goblin) => {
        //     this.physics.add.collider(goblin, this.houses1);
        //     this.physics.add.collider(goblin, this.houses2);
        //     this.physics.add.collider(goblin, this.trees1);
        //     this.physics.add.collider(goblin, this.trees2);
        // });
        // Phaser.Actions.Call(this.skeltons.getChildren(), (skelton) => {
        //     this.physics.add.collider(skelton, this.houses1);
        //     this.physics.add.collider(skelton, this.houses2);
        //     this.physics.add.collider(skelton, this.trees1);
        //     this.physics.add.collider(skelton, this.trees2);
        // });

        // this.physics.add.collider(this.goblins, this.arrows, (goblin, arrow) => {
        //     goblin.sufferDamage(arrow.getDamage());
        //     arrow.die();
        // });
        //
        // this.physics.add.collider(this.skeltons, this.arrows, (skelton, arrow) => {
        //     skelton.sufferDamage(arrow.getDamage());
        //     arrow.die();
        // });

        this.physics.add.collider(this.npc, this.player, (npc, player) => {
            npc.Talk(this);
        });
    }

    addEvents() {
        this.input.on('pointerdown', (pointer) => {
            this.arrows.fireProjectile(this.player.x, this.player.y, pointer.worldX, pointer.worldY, 'arrow', 0);
        }, this);
        this.physics.world.on('worldbounds', (body) => {
            body.gameObject.die();
        });
    }

    Level1Collisions(){
        // this.physics.world.collide(this.trees1, this.goblins);
        // this.physics.world.collide(this.trees1, this.skeltons);
        this.physics.world.collide(this.trees1, this.player);

        // this.physics.world.collide(this.houses1, this.goblins);
        // this.physics.world.collide(this.houses1, this.skeltons);
        this.physics.world.collide(this.houses1, this.player);
    }

    Level2Collisions(){
        this.physics.world.collide(this.trees2, this.goblins);
        this.physics.world.collide(this.trees2, this.skeltons);
        this.physics.world.collide(this.trees2, this.player);

        this.physics.world.collide(this.houses2, this.goblins);
        this.physics.world.collide(this.houses2, this.skeltons);
        this.physics.world.collide(this.houses2, this.player);
    }

    update(){
        if (this.isTalking == false){
            this.player.Update();
        }else{
            this.npc.Capturekeys();
        }
        if (this.CollsionLevel === 1){
            this.Level1Collisions();

        }else{
            this.Level2Collisions();
        }
        if (this.cursors.space.isDown){
        //     this.CollsionLevel = 2;
        //     this.mapLevel2();
        //     this.scene.start('RoadToVillage', {playerData: this.player.data});
            //this.scene.start('RoadToVillage');
            // console.log(this.player.x);
            // console.log(this.player.y);
        }
    }
}
