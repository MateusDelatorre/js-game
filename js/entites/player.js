import Actor from './actor.js';
export default class Player extends Actor{
    constructor(scene, x, y, texture, frame, hp, weaponKey) {
        super(scene, x, y, texture, frame);
        this.velocity = 140;
        this.setHP(hp);
        this.setWeapon(weaponKey);
        //this.flashlight = flashlight;
    }

    CreateAnims(){
        this.anims.create({
            key: 'test',
            frameRate: 7,
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2}),
            repeat: -1
        });
        // animation with key 'right'
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 6, 0, 12 ] }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.play('test', true);
    }

    setWeapon(key){
        this.weaponKey = key;
    }
    getWeapon(){
        return this.weaponKey;
    }

    update(time, delta){
        this.Move();
    }

    Move(){
        this.body.setVelocity(0);
        // Horizontal movement
        if (this.scene.cursors.left.isDown)
        {
            this.body.setVelocityX(-this.velocity);
        }
        else if (this.scene.cursors.right.isDown)
        {
            this.body.setVelocityX(this.velocity);
        }
        // Vertical movement
        if (this.scene.cursors.up.isDown)
        {
            this.body.setVelocityY(-this.velocity);
        }
        else if (this.scene.cursors.down.isDown)
        {
            this.body.setVelocityY(this.velocity);
        }
    }

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