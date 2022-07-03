import Player from "../entites/player.js";
import Bullets from "../entites/bullets.js";
import Projectile from "../entites/projectile.js";
import Enemies from "../entites/enemies.js";
import Goblin from "../entites/goblin.js";
import Skeleton from "../entites/skeleton.js";
import Knight from "../entites/npcs/knight.js";

const equals = (a, b) =>
    a.length === b.length &&
    a.every((v, i) => v === b[i]);

export default class RoadToVillage extends Phaser.Scene{
    constructor(){
        super('RoadToVillage');
    }
    init(){
        this.storage = JSON.parse(localStorage.getItem("data"));
    }
    preload(){
        this.load.tilemapTiledJSON('map1', 'assets/map/JsonMap/Level1.json');
        this.load.image('mythril-Ground-tile', 'assets/map/mythril-age-A2_Ground.png');
        this.load.image('OutdoorCamping', 'assets/map/OutdoorCamping.gif');
        this.load.spritesheet('player', 'assets/player/texture.png', { frameWidth: 15, frameHeight: 22 });
        this.load.spritesheet('knight', 'assets/entites/knight.png', { frameWidth: 17, frameHeight: 10 });
        this.load.spritesheet('goblin', 'assets/enemies/goblin.png', { frameWidth: 11, frameHeight: 12 });
        this.load.spritesheet('skelet', 'assets/enemies/skelet.png', { frameWidth: 10, frameHeight: 16 });
        this.load.spritesheet('arrow', 'assets/weapons/arrow.png', { frameWidth: 21, frameHeight: 7 });
    }
    create(){
        this.text = [null, null, null];
        this.addMap();
        this.createEntites();
        if (this.storage.RoadToVillage.levelCleared)
            this.mapLevel2();
        else{
            this.npc.die();
            this.enemiesSpawn();
            this.mapLevel1();
        }
        this.addCollisions();
        this.addEvents();
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;
        this.createUI();
        this.isTalking = false;
        this.createText();
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

    addMap() {
        this.map = this.make.tilemap({ key: 'map1' });//the key is the key of your json map
        this.tileset = this.map.addTilesetImage('mythril-age-A2_Ground', 'mythril-Ground-tile');//the key is the same as the tileset image
        this.tileset2 = this.map.addTilesetImage('OutdoorCamping', 'OutdoorCamping');//the key is the same as the tileset image
        this.ground = this.map.createLayer('ground', this.tileset);//this is line define a layer of the tiled map
        this.ground1 = this.map.createLayer('ground1', this.tileset);//this is line define a layer of the tiled map
        this.ground2= this.map.createLayer('ground2', [this.tileset, this.tileset2]);//this is line define a layer of the tiled map
        this.next_level = this.map.createLayer('next_level', this.tileset2);//this is line define a layer of the tiled map
        this.physics.world.bounds.width = this.map.widthInPixels;//set the world bound
        this.physics.world.bounds.height = this.map.heightInPixels;
    }

    mapLevel1(){
        //set others levels invisible
        this.next_level.setCollisionByProperty({ collides: true });//make the layer callable
        this.ground2.setVisible(false);
        this.next_level.setVisible(false);
    }

    mapLevel2(){
        //set others levels invisible
        this.next_level.setCollisionByProperty({ collides: true });//make the layer callable
        this.ground1.setVisible(false);
        this.ground2.setVisible(true);
        this.next_level.setVisible(false);
    }

    update(){
        if (this.isTalking == false){
            this.player.update();
        }else{
            this.npc.Capturekeys();
        }

    }

    createEntites() {
        this.player = new Player(this, 381, this.map.heightInPixels - 30, 'player', 0, this.storage.Player.hp,
            this.storage.Player.weapon);
        this.arrows = new Bullets(this, Projectile, this.storage.Player.damage);
        this.enemy_arrows = new Bullets(this, Projectile, this.storage.Player.damage);
        this.goblins = new Enemies(this, Goblin);
        this.skeltons = new Enemies(this, Skeleton);
        this.npc = new Knight(this, 104, 727, 'knight', 0);
        this.npc.setPushable(false);
    }

    createUI() {
        this.test_text = this.add.text(0, 0, this.storage.Player.hp, {
            backgroundColor: '#4287f5',
            padding: {
                left: 5,
                top: 5
            }
        }).setVisible(true).setScrollFactor(0);
    }

    enemiesSpawn(){
        this.GoblinLoopSpawn(0, 60, 50, 4, 20);
        this.GoblinLoopSpawn(4, 80, 50, 2, 60);
        this.GoblinLoopSpawn(6, 100, 50, 2, 60);
        this.GoblinLoopSpawn(8, 120, 50, 4, 20);

        this.GoblinLoopSpawn(12, 660, 50, 4, 20);
        this.GoblinLoopSpawn(16, 680, 50, 2, 60);
        this.GoblinLoopSpawn(18, 700, 50, 2, 60);
        this.GoblinLoopSpawn(20, 720, 50, 4, 20);

        this.SkeletLoopSpawn(0, 100, 90, 2, 600);
        // this.skeltons.Spawn(80, 90, 'skelet', 3);
        // this.skeltons.Spawn(80, 70, 'skelet', 3);
        // this.skeltons.Spawn(100, 70, 'skelet', 3);
    }

    GoblinLoopSpawn(index, x, y, amount, y_increment){
        for(let i = 0; i < amount; index++, y += y_increment, i++){
            if(equals(this.storage.RoadToVillage.goblins_alive[index], [index, 1])){
                this.goblins.Spawn(x, y, 'goblin', 3, index, 'goblin');
            }
        }
    }

    SkeletLoopSpawn(index, x, y, amount, x_increment){
        for(let i = 0; i < amount; index++, x += x_increment, i++){
            if(equals(this.storage.RoadToVillage.skelets_alive[index], [index, 1])){
                this.skeltons.Spawn(x, y, 'skelet', 3, index, 'skelet');
            }
        }
    }

    addCollisions(){
        this.physics.add.collider(this.goblins, this.arrows, (goblin, arrow) => {
            goblin.sufferDamage(arrow.getDamage());
            arrow.die();
        });

        this.physics.add.collider(this.skeltons, this.arrows, (skelton, arrow) => {
            skelton.sufferDamage(arrow.getDamage());
            arrow.die();
        });

        this.physics.add.collider(this.goblins, this.player, (player, goblin) => {
            player.sufferDamage(goblin.getDamage());
            player.knockBack(goblin.x, goblin.y);
            this.test_text.setText(player.getHP());
        });

        this.physics.add.collider(this.skeltons, this.player, (player, skelton) => {
            player.sufferDamage(skelton.getDamage());
            player.knockBack(skelton.x, skelton.y);
            this.test_text.setText(player.getHP());
        });

        this.physics.add.collider(this.player, this.enemy_arrows, (player, arrow) => {
            player.sufferDamage(arrow.getDamage());
            player.knockBack(arrow.x, arrow.y);
            arrow.die();
            this.test_text.setText(player.getHP());
        });

        this.physics.add.collider(this.player, this.next_level, () => {
            this.events.off('pointerdown');
            this.events.off('worldbounds');
            this.storage.Player.spawn_x = 558;
            this.storage.Player.spawn_y = 29;
            //if (this.)
            localStorage.setItem("data", JSON.stringify(this.storage));
            this.scene.start('Village');
        });
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

    SomeoneDied(who){
        this.storage.RoadToVillage.enemiesAlive--;
        this.storage.RoadToVillage.enemiesKilled++;
        if (who.name == 'goblin'){
            //this.test_text.setText(this.storage.RoadToVillage.goblins_alive.length);
            this.storage.RoadToVillage.goblins_alive[who.index] = [who.index, 0];
            console.log(who.index);
        }
        if (who.name == 'skelet'){
            //this.test_text.setText(this.storage.RoadToVillage.skelets_alive.length);
            this.storage.RoadToVillage.skelets_alive[who.index] = [who.index, 0];
            //console.log(who.index);
        }
        if (this.storage.RoadToVillage.enemiesAlive == 0){
            this.storage.RoadToVillage.levelCleared = true;
            this.storage.Village.wizardTalk = 2;
        }
        //this.test_text.setText(this.storage.RoadToVillage.enemiesAlive);
    }
}