import Actor from "./actor.js";

export default class Projectile extends Actor{
    constructor(scene, x, y, texture) {
    super(scene, x, y, texture, 0);

    }
    //Do a bunch of math for the projectile go flying through the skies in the right direction
    fire(playerX, playerY, pointerX, pointerY){
        this.vectorX = pointerX - playerX;
        this.vectorY = pointerY - playerY;
        this.vector_modulus = Math.sqrt(Math.pow(this.vectorX, 2) + Math.pow(this.vectorY, 2));
        this.velocityX = 200 * (this.vectorX / this.vector_modulus);
        this.velocityY = 200 * (this.vectorY / this.vector_modulus);
        this.setRotation(Math.atan2(this.vectorY, this.vectorX));
        super.spawn(playerX, playerY);
        this.body.setVelocityX(this.velocityX);
        this.body.setVelocityY(this.velocityY);
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
    }

}