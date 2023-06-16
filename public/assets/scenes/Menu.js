export default class Menu extends Phaser.Scene {
    constructor() {
      super("Menu");
    }



create(){
    this.add.image(400, 300, "background");
    this.add.image(400, 300, "background2");
    this.add.image(400, 300, "title");
    this.add.image(400, 300, "botonI").setInteractive()
    .on('pointerdown', () => this.scene.start('Level1')); ;
    
    //this.play("musicMenu")


    // let isMusicMuted = false;
    // let musicOn = this.add.image(770, 515, "sound").setInteractive().setDepth(1);
    
    // musicOn.on("pointerdown", () => {
    //   if (isMusicMuted){
    //     // music.play();
    //     musicOn.setTexture("sound");
    //     isMusicMuted = false;
    //   } else {
    //     //music.pause();
    //     musicOn.setTexture("soundOff");
    //     isMusicMuted = true;
    //   }
    // });
}
















}