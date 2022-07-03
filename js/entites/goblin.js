import Enemy from "./enemy.js";

export default class Goblin extends Enemy{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.setHP(100);
        this.setDamage(10);
        this.AITyipe = 0;
        this.CreateAnims();
        this.anims.play('idle', true);
    }

    CreateAnims(){
        this.anims.create({
            key: 'idle',
            frameRate: 7,
            frames: this.anims.generateFrameNumbers('goblin', { start: 0, end: 2}),
            repeat: -1
        });
        // animation with key 'right'
        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('goblin', { start: 3, end: 7}),
            frameRate: 10,
            repeat: -1
        });
    }

    runAI(player){
        if (this.AITyipe == 0){
            this.normalAI(player);
        }
    }

    normalAI(player){
        let distance = Phaser.Math.Distance.Between(player.x, player.y, this.x, this.y);
        if (Math.abs(distance) < 200) {
            this.anims.play('move', true);
            this.scene.physics.moveToObject(this, player, 10);
        }else {
            this.anims.play('idle', true);
            this.setVelocity(0);
        }
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.runAI(this.scene.player);
        //this.scene.physics.moveToObject(this, this.scene.player, 10);//make this object move in direction of the other object in the given speed
    }

}