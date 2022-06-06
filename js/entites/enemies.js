export default class Enemies extends Phaser.Physics.Arcade.Group{
    constructor(scene, classType) {
        super(scene.physics.world, scene);
        this.classType = classType;
    }

    Spawn(x, y, key, frame, index = 0, name){
        const new_enemy = this.getFirstDead(true, x, y, key, frame, true);//get the first item on the group that has it active status set to false, and if it not find and the group still has space it will create a new object of the given class type
        if(new_enemy) {
            new_enemy.spawn(x, y);
            new_enemy.index = index;
            new_enemy.name = name;
        }
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }

    die(){
        super.die();
        this.scene.SomeoneDied(this.texture);
    }

}