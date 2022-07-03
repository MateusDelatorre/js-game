import Actor from "../actor.js";
import Dialog from "../../../assets/dialogues/knight.js";

//For more information about this class see https://github.com/MateusDelatorre/js-game/blob/release/js/entites/NPC.js
export default class Knight extends Actor{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.graphics = null;
        this.choice = 1;
        this.subTalk = 0;
        this.spaceDown = false;
    }

    Talk(scene){
        scene.isTalking = true;
        this.ShowDialog(Dialog.dialogues[0][0].dialog);
    }

    ShowDialog(txt){
        this.scene.text[0].setVisible(true);
        this.scene.text[0].setText(txt);
    }

    Capturekeys(){
        if (this.scene.cursors.space.isDown)
        {
            this.spaceDown = true;
        }
        if (this.spaceDown){
            if (this.scene.cursors.space.isUp){
                this.SelectChoice();
            }

        }
    }

    SelectChoice() {
        this.scene.isTalking = false;
        this.ResetText();
        this.spaceDown = false;
    }

    ResetText(){
        for (let i = 0; i < 3; i++){
            this.scene.text[i].setVisible(false);
        }
    }
}