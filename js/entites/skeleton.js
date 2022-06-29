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
    }

}