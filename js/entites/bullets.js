//Class to handle group of things that fly
export default class Bullets extends Phaser.Physics.Arcade.Group{
    damage;
    constructor(scene, classType, damage) {
        super(scene.physics.world, scene);
        this.classType = classType;
        this.damage = damage;
    }
    //Makes something go fly through the skies
    fireProjectile(playerX, playerY, pointerX, pointerY, key, frame){
        //return the first dead sprite from the list or create a new one
        const new_projectile = this.getFirstDead(true, playerX, playerY, key, frame, true);
        if(new_projectile) {
            new_projectile.setDamage(this.damage);
            new_projectile.fire(playerX, playerY, pointerX, pointerY);
        }
    }
}