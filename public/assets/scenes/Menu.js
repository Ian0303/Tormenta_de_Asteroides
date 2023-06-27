export default class Menu extends Phaser.Scene {
  isMusicMuted; musicM;
  constructor() {
    super("Menu");
  }

  init() {

  }

  create() {
    this.add.image(400, 300, "background");
    this.add.image(400, 300, "background2");
    this.add.image(400, 300, "title");
    this.add.image(400, 310, "decoracion").setScale(0.5);
    //this.add.image(640, 130, "sound").setScale(0.5);
    this.add.image(400, 500, "botonI").setInteractive()
      .on('pointerdown', () => this.scene.start('Level1', {isMusicMuted},{musicM}));;




    let isMusicMuted = false;
    let musicM = this.sound.add("musicMenu").setLoop(true);
    let musicOn = this.add.image(700, 40, "sound").setInteractive().setDepth(1);
    musicM.play();

    musicOn.on("pointerdown", () => {
      if (isMusicMuted) {
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

  update() {


  }















}