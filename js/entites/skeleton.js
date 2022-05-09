import Enemy from "./enemy.js";

export default class Skeleton extends Enemy{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.setHP(40);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        //this.scene.physics.moveToObject(this, this.scene.player, 10);
    }

}