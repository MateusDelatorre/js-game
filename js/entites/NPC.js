import Actor from "./actor.js";
import Dialog from "../../assets/dialogues/wizzard.js";

export default class NPC extends Actor{
    data;
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.text = [4];
        this.graphics = null;
        this.choice = 1;
        this.subTalk = 0;
    }

    Capturekeys(){
        if (this.scene.cursors.left.isDown) {
            this.changeChoice(-1);
        }
        else if (this.scene.cursors.right.isDown) {
            this.changeChoice(1);
        }
    }

    Talk(scene){
        //this.graphics = scene.add.graphics({ lineStyle: { width: 2, color: 0x0000aa }, fillStyle: { color: 0x00aa00} })
        if(this.subTalk >= Dialog.dialogues[scene.storage.Village.wizardTalk][this.subTalk].length){
            scene.isTalking = false;
            scene.events.off('keydown-SPACE', () => {
                this.SelectChoice();
            });
            return;
        }
        if (this.subTalk == 0){
            this.createText();
            console.log("Criou")
            scene.input.keyboard.on('keydown-SPACE', () => {
                this.SelectChoice();
                this.Talk(this.scene);
            });
        }
        scene.isTalking = true;
        this.ShowDialog(Dialog.dialogues[scene.storage.Village.wizardTalk][this.subTalk].dialog);
        if (Dialog.dialogues[scene.storage.Village.wizardTalk][this.subTalk].response != null){
            this.showResponse(Dialog.dialogues[scene.storage.Village.wizardTalk][this.subTalk].response);
        }
        this.drawChoice();
    }

    drawChoice() {

        this.text[this.choice].setStyle({
            backgroundColor: '#f542ef',
            padding: {
                left: 5,
                top: 5
            }
        });
        //console.log(this.text[this.choice]);
        //point[2] = [0, 1];
        //let x = this.text[this.choice].x;
        //let y = this.text[this.choice].y;
        //point[0] = x;
        //point[1] = (y + this.text[this.choice].width);
        //let rect = Phaser.Geom.Rectangle.FromPoints(points, rect);
        //this.graphics.strokeRect(x, y + 30, this.text[this.choice].width + 5, this.text[this.choice].height + 5);
        //this.graphics.strokeRect(rect);
    }

    changeChoice(change){
        this.text[this.choice].setStyle({
            backgroundColor: '#4287f5',
            padding: {
                left: 5,
                top: 5
            }
        });
        if (Dialog.dialogues[this.scene.storage.Village.wizardTalk][this.subTalk].response != null ||
            Dialog.dialogues[this.scene.storage.Village.wizardTalk][this.subTalk].response != {} ||
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

    }

    ShowDialog(txt){
        console.log(this.text[0]);
        this.text[0].setText(txt);
    }

    showResponse(response) {
        console.log(response);
        for (let i = 0; i < response.length; i++){
            this.text[i+1].setText(response[i]);
        }
    }

    SelectChoice() {
        this.subTalk++;
    }

    createText() {
        this.text[0] = this.scene.add.text(this.x, this.y, "", {
            backgroundColor: '#4287f5',
            padding: {
                left: 5,
                top: 5
            },
            fontSize: 10
        }).setVisible(true).setScrollFactor(0);
        let aux = 0
        for (let i = 1; i < 4; i++, aux += 40){
            this.text[i] = this.scene.add.text(this.x + aux, this.y + 25, "", {
                backgroundColor: '#4287f5',
                padding: {
                    left: 5,
                    top: 5
                },
                fontSize: 10
            }).setVisible(true).setScrollFactor(0);
        }
        console.log("text created");
    }
}