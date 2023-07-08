export default class Preload extends Phaser.Scene {
  constructor() {
    super("End");
  }

  init({ isMusicMuted, musicM, score, cantAsteroides }) {
    this.score = 0;
    this.gameOver = false;
    this.vida = 1;
    this.cantMisil = 5;
    this.isMusicMuted = isMusicMuted;
    this.musicM = musicM;
    cantAsteroides = cantAsteroides
  }


  create() {
    this.add.image(400, 300, "background");

    this.add.image(400, 300, "background7").setScale(0.5);;
    this.add.image(400, 420, "botonI").setInteractive().on('pointerdown', () => this.scene.start("Menu"));;

    this.clasificText = this.add.text(170, 100, "Clasificación:", {
      fontSize: "45px",
      fontStyle: "bold",
      frontFamily: "Console",
      color: '#ffffff',
      stroke: '#00ff00',
      strokeThickness: 4,
    });

    this.playerScoreText = this.add.text(200, 260, "nombre " + this.score, {
      fontSize: "24px",
      fontStyle: "bold",
      frontFamily: "Console",
      color: '#000000',
    })
    this.scoreJuanText = this.add.text(200, 290, "Juan: 10000", {
      fontSize: "24px",
      fontStyle: "bold",
      frontFamily: "Console",
      color: '#000000',
    })
    this.scorePabloText = this.add.text(200, 320, "Pablo: 8000", {
      fontSize: "24px",
      fontStyle: "bold",
      frontFamily: "Console",
      color: '#000000',
    })
    this.scoreMariaText = this.add.text(200, 350, "Maria: 5000", {
      fontSize: "24px",
      fontStyle: "bold",
      frontFamily: "Console",
      color: '#000000',
    })


  }


}