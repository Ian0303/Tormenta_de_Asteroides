export default class Menu extends Phaser.Scene {
    constructor() {
      super("Menu");
    }

init(){

}

create(){
    this.add.image(400, 300, "background");
    this.add.image(400, 300, "background2");
    this.add.image(400, 300, "title");
    this.add.image(400, 310, "decoracion").setScale(0.5);
    //this.add.image(640, 130, "sound").setScale(0.5);
    this.add.image(400, 300, "botonI").setInteractive()
    .on('pointerdown', () => this.scene.start('Level1')); ;
    
    let musicM = this.sound.add("musicMenu").setLoop(true);
    let isMusicMuted = false;

    let musicOn = this.add.image(640, 130, "sound").setInteractive().setDepth(1).setScale(0.5);
    
    musicOn.on("pointerdown", () => {
      if (isMusicMuted){
        musicM.play();
        musicOn.setTexture("sound");
        isMusicMuted = false;
      } else {
        musicM.pause();
        musicOn.setTexture("soundOff");
        isMusicMuted = true;
      }
    });
}

update(){

  
}















}