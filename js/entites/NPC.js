import Actor from "./actor.js";
import Dialog from "../../assets/dialogues/wizzard.js";

export default class NPC extends Actor{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.graphics = null;
        this.choice = 1;
        this.subTalk = 0;
        this.spaceDown = false;
    }

    Talk(scene){
        scene.isTalking = true;
        this.ShowDialog(Dialog.dialogues[scene.storage.Village.wizardTalk][this.subTalk].dialog);
        if (Dialog.dialogues[scene.storage.Village.wizardTalk][this.subTalk].response != null){
            this.showResponse(Dialog.dialogues[scene.storage.Village.wizardTalk][this.subTalk].response);
        }
        this.drawChoice();
    }

    ShowDialog(txt){
        this.scene.text[0].setVisible(true);
        this.scene.text[0].setText(txt);
    }

    showResponse(response) {
        for (let i = 0; i < response.length; i++){
            this.scene.text[i+1].setVisible(true);
            this.scene.text[i+1].setText(response[i]);
        }
    }

    NoResponse() {
        for (let i = 1; i < 3; i++){
            this.scene.text[i].setVisible(false);
        }
    }

    drawChoice() {

        this.scene.text[this.choice].setStyle({
            backgroundColor: '#f542ef',
            padding: {
                left: 5,
                top: 5
            }
        });
    }

    Capturekeys(){
        if (this.scene.cursors.left.isDown) {
            this.changeChoice(-1);
        }
        else if (this.scene.cursors.right.isDown) {
            this.changeChoice(1);
        }
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

    changeChoice(change){
        this.scene.text[this.choice].setStyle({
            backgroundColor: '#4287f5',
            padding: {
                left: 5,
                top: 5
            }
        });
        if (Dialog.dialogues[this.scene.storage.Village.wizardTalk][this.subTalk].response != null &&
            Dialog.dialogues[this.scene.storage.Village.wizardTalk][this.subTalk].response != {} &&
            Dialog.dialogues[this.scene.storage.Village.wizardTalk][this.subTalk].response != undefined){
            this.choice += change;
            if (this.choice <= 1){
                this.choice = 1;
                this.drawChoice();
                return;
            }
            if (this.choice >= Dialog.dialogues[this.scene.storage.Village.wizardTalk][this.subTalk].response.length){
                this.choice = Dialog.dialogues[this.scene.storage.Village.wizardTalk][this.subTalk].response.length;
                this.drawChoice();
                return;
            }
        }
        this.drawChoice();
    }

    SelectChoice() {
        this.subTalk++;
        if(this.subTalk >= Dialog.dialogues[this.scene.storage.Village.wizardTalk].length){
            this.scene.isTalking = false;
            if (this.scene.storage.Village.wizardTalk == 0)
                this.scene.storage.Village.wizardTalk++;
            this.subTalk = 0;
            this.ResetText();
        }else{
            this.ResetText();
            this.Talk(this.scene);
        }
        this.spaceDown = false;
    }

    ResetText(){
        for (let i = 0; i < 3; i++){
            this.scene.text[i].setVisible(false);
        }
    }
}