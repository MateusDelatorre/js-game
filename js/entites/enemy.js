import Actor from './actor.js';

export default class Enemy extends Actor{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }

}