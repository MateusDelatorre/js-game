import Actor from './actor.js';
export default class Player extends Actor{
    constructor(scene, x, y, texture, frame, hp, weaponKey) {
        super(scene, x, y, texture, frame);
        this.velocity = 140;
        this.setHP(hp);
        this.setWeapon(weaponKey);
        //this.flashlight = flashlight;
        this.CreateAnims();
        this.anims.play('idle', true);
        this.idle = true;
    }

    CreateAnims(){
        this.anims.create({
            key: 'idle',
            frameRate: 7,
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2}),
            repeat: -1
        });
        // animation with key 'right'
        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('player', { start: 3, end: 7}),
            frameRate: 10,
            repeat: -1
        });
    }

    update(time, delta){
        this.CaptureKeys();
        if (this.idle){
            this.anims.play('idle', true);
        }
    }

    CaptureKeys(){
        this.body.setVelocity(0);
        this.idle = true;
        // Horizontal movement
        if (this.scene.cursors.left.isDown)
        {
            this.MoveX(-this.velocity);
        }
        else if (this.scene.cursors.right.isDown)
        {
            this.MoveX(this.velocity);
        }
        // Vertical movement
        if (this.scene.cursors.up.isDown)
        {
            this.MoveY(-this.velocity);
        }
        else if (this.scene.cursors.down.isDown)
        {
            this.MoveY(this.velocity)
        }

    }

    MoveX(module){
        this.anims.play('move', true);
        this.body.setVelocityX(module);
        this.idle = false;
    }

    MoveY(module){
        this.anims.play('move', true);
        this.body.setVelocityY(module);
        this.idle = false;
    }

    setWeapon(key){
        this.weaponKey = key;
    }

    getWeapon(){
        return this.weaponKey;
    }
    //Makes the MC tp in the other direction
    knockBack(body_x,body_y){
        this.vectorX = this.x -body_x;
        this.vectorY = this.y - body_y;
        this.vector_modulus = Math.sqrt(Math.pow(this.vectorX, 2) + Math.pow(this.vectorY, 2));
        let velocityX = 20 * (this.vectorX / this.vector_modulus);
        let velocityY = 20 * (this.vectorY / this.vector_modulus);
        this.x += velocityX;
        this.y += velocityY;
    }
}