import Enemy from "./enemy.js";

export default class Goblin extends Enemy{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.setHP(100);
    }

    runAI(player){
        let distance = Phaser.Math.Distance.Between(player.x, player.y, this.x, this.y);
        if (Math.abs(distance) < 200) {
            this.scene.physics.moveToObject(this, player, 10);
        }else {
            this.setVelocity(0);
        }
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.runAI(this.scene.player);
        //this.scene.physics.moveToObject(this, this.scene.player, 10);//make this object move in direction of the other object in the given speed
    }

}