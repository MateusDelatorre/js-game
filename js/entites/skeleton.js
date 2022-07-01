import Enemy from "./enemy.js";

export default class Skeleton extends Enemy{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.setHP(40);
        this.delay = 0;
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.rangedAI(this.scene.player, time);
        //this.scene.physics.moveToObject(this, this.scene.player, 10);
    }

    rangedAI(player, time){
        let distance = Phaser.Math.Distance.Between(player.x, player.y, this.x, this.y);
        if (Math.abs(distance) < 200){
            this.vectorX = this.x - player.x;
            this.vectorY = this.y - player.y;
            this.vector_modulus = Math.sqrt(Math.pow(this.vectorX, 2) + Math.pow(this.vectorY, 2));
            let velocityX = 20 * (this.vectorX / this.vector_modulus);
            let velocityY = 20 * (this.vectorY / this.vector_modulus);
            this.body.setVelocityX(velocityX);
            this.body.setVelocityY(velocityY);
        }else if (Math.abs(distance) < 500) {
            if (time >= this.delay){
                this.delay = time + 3000;
                this.scene.enemy_arrows.fireProjectile(this.x, this.y, player.x, player.y, 'arrow', 0);
            }
        }else {
            this.setVelocity(0);
        }
    }

}