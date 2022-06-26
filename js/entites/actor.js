export default class Actor extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        //I will say before hand that I don't know if this next two lines must be there
        scene.add.existing(this);//Add this Sprite to the scene
        scene.physics.add.existing(this);//Add this Sprite to the Physics manager of the scene
        this.body.setCollideWorldBounds(true);//make it collider to the end of the map
    }

    //This function make things appear on the screen
    spawn(x, y){
        this.body.enable = true;//Make sure that the body(the physic part of the sprite) is "alive"
        this.body.reset(x, y);//Reset the position of the body to the x and y
        this.setActive(true);
        this.setVisible(true);
    }

    die(){
        this.disableBody(true, true);
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
    }

    setDamage(damage){
        this.damage = damage;
    }

    getDamage(){
        return this.damage;
    }

    getHP(){
        return this.hp;
    }

    setHP(hp){
        this.hp = hp;
    }

    sufferDamage(damage){
        this.hp -= damage;
        if (this.isDead()) this.die();
    }

    isDead(){
        if (this.hp < 1) return true;
        return false;
    }

}