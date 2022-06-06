import Enemy from "./enemy.js";

export default class Skeleton extends Enemy{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.setHP(40);
        this.elem = document.createElement('div');
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.setVelocity(0);

        //this.scene.physics.moveToObject(this, this.scene.player, 10);
    }

    die(){
        this.disableBody(true, true);
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
    }

}