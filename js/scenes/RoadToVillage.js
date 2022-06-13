import Player from "../entites/player.js";
import Bullets from "../entites/bullets.js";
import Projectile from "../entites/projectile.js";
import Enemies from "../entites/enemies.js";
import Goblin from "../entites/goblin.js";
import Skeleton from "../entites/skeleton.js";

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
        this.load.spritesheet('player', 'assets/player/texture.png', { frameWidth: 15, frameHeight: 20 });
        this.load.spritesheet('goblin', 'assets/enemies/goblin.png', { frameWidth: 10, frameHeight: 10 });
        this.load.spritesheet('skelet', 'assets/enemies/skelet.png', { frameWidth: 10, frameHeight: 14 });
        this.load.spritesheet('arrow', 'assets/weapons/arrow.png', { frameWidth: 21, frameHeight: 7 });
    }
    create(){
        this.createData();
        this.addMap();
        this.createEntites();
        this.createUI();
        this.enemiesSpawn();
        this.addCollisions();
        this.addEvents();
        this.mapLevel1();

        this.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        //this.cameras.main.setSize(this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.roundPixels = true;
        //this.player.CreateAnims();
        //this.player.setTexture('player', 1);
    }

    update(){
        this.player.Update();
        if (this.cursors.space.isDown)
        {
            //this.scene.start('Village', {player: this.player});
            localStorage.setItem("data",  JSON.stringify(this.storage));
            console.log("Salvando data");
        }
    }

    createData(){

        if (this.storage == null){
            this.storage = {
                RoadToVillage: {},
                Player: {}
            };
            this.storage.RoadToVillage = {
                enemiesTotal: 3,
                enemiesKilled: 0,
                enemiesAlive: 3,
                levelCleared: false
            };
            let temp = [];
            for (let i = 0; i < 24; i++){
                temp.push([i, 1]);
            }
            this.storage.RoadToVillage.goblins_alive = temp;
        }
        //if (Object.keys(this.storage.RoadToVillage).length === 0){// || this.storage.RoadToVillage.created == 0
    }

    SomeoneDied(who){
        if (who.name == 'goblin'){
            this.goblin_alive--;
            this.test_text.setText(this.storage.RoadToVillage.goblins_alive.length);
            this.storage.RoadToVillage.goblins_alive[who.index] = [who.index, 0];
            console.log(who.index);
        }
    }

    createEntites() {
        this.player = new Player(this, 50, 400, 'player', 0);
        this.arrows = new Bullets(this, Projectile, 20);
        this.goblins = new Enemies(this, Goblin);
        this.skeltons = new Enemies(this, Skeleton);
    }

    createUI() {
        this.test_text = this.add.text(0, 0, this.storage.RoadToVillage.goblins_alive.length, {
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

        this.skeltons.Spawn(100, 90, 'skelet', 3);
        this.skeltons.Spawn(700, 90, 'skelet', 3);
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

    addCollisions(){
        this.physics.add.collider(this.goblins, this.arrows, (goblin, arrow) => {
            goblin.sufferDamage(arrow.getDamage());
            arrow.die();
        });

        this.physics.add.collider(this.skeltons, this.arrows, (skelton, arrow) => {
            skelton.sufferDamage(arrow.getDamage());
            arrow.die();
        });
    }

    addMap() {
        this.map = this.make.tilemap({ key: 'map1' });//the key is the key of your json map
        this.tileset = this.map.addTilesetImage('mythril-age-A2_Ground', 'mythril-Ground-tile');//the key is the same as the tileset image
        this.tileset2 = this.map.addTilesetImage('OutdoorCamping', 'OutdoorCamping');//the key is the same as the tileset image
        this.ground = this.map.createLayer('ground', this.tileset);//this is line define a layer of the tiled map
        this.ground1 = this.map.createLayer('ground1', this.tileset);//this is line define a layer of the tiled map
        this.ground2= this.map.createLayer('ground2', [this.tileset, this.tileset2]);//this is line define a layer of the tiled map
        this.physics.world.bounds.width = this.map.widthInPixels;//set the world bound
        this.physics.world.bounds.height = this.map.heightInPixels;
    }

    addEvents() {
        this.input.on('pointerdown', (pointer) => {
            this.arrows.fireProjectile(this.player.x, this.player.y, pointer.worldX, pointer.worldY, 'arrow', 0);
        }, this);
        this.physics.world.on('worldbounds', (body) => {
            body.gameObject.die();
        });
    }

    mapLevel1(){
        //set others levels invisible
        this.ground2.setVisible(false);
    }

    customEvents(){

    }
}