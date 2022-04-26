import Enemy from "./enemy.js";

export default class Goblin extends Enemy{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.hp = 100;
    }

    runAI(player){
        this.scene.physics.moveToObject(this, player, 10);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.scene.physics.moveToObject(this, this.scene.player, 10);//make this object move in direction of the other object in the given speed
    }

}