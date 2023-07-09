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
    this.add.image(400, 450, "botonInt").setInteractive().on('pointerdown', () => this.scene.start("Menu"));;

    this.clasificText = this.add.text(200, 100, "Clasificación:", {
      fontSize: "45px",
      fontStyle: "bold",
      frontFamily: "Console",
      color: '#ffffff',
      stroke: '#00ff00',
      strokeThickness: 4,
    });

    this.playerScoreText = this.add.text(220, 260, "nombre ", {
      fontSize: "24px",
      fontStyle: "bold",
      frontFamily: "Console",
      color: '#000000',
    })
    this.playerScoreNText = this.add.text(500, 260, this.score, {
      fontSize: "24px",
      fontStyle: "bold",
      frontFamily: "Console",
      color: '#000000',
    })
    this.scoreJuanText = this.add.text(220, 290, "Juan: ", {
      fontSize: "24px",
      fontStyle: "bold",
      frontFamily: "Console",
      color: '#000000',
    })
    this.scoreJuanNText = this.add.text(500, 290, "10000", {
      fontSize: "24px",
      fontStyle: "bold",
      frontFamily: "Console",
      color: '#000000',
    })
    this.scorePabloText = this.add.text(220, 320, "Pablo: ", {
      fontSize: "24px",
      fontStyle: "bold",
      frontFamily: "Console",
      color: '#000000',
    })
    this.scorePabloNText = this.add.text(500, 320, "8000", {
      fontSize: "24px",
      fontStyle: "bold",
      frontFamily: "Console",
      color: '#000000',
    })
    this.scoreMariaText = this.add.text(220, 350, "Maria: ", {
      fontSize: "24px",
      fontStyle: "bold",
      frontFamily: "Console",
      color: '#000000',
    })
    this.scoreMariaNText = this.add.text(500, 350, "5000", {
      fontSize: "24px",
      fontStyle: "bold",
      frontFamily: "Console",
      color: '#000000',
    })
    this.scoreLucasText = this.add.text(220, 380, "Lucas: ", {
      fontSize: "24px",
      fontStyle: "bold",
      frontFamily: "Console",
      color: '#000000',
    })
    this.scoreLucasNText = this.add.text(500, 380, "3000", {
      fontSize: "24px",
      fontStyle: "bold",
      frontFamily: "Console",
      color: '#000000',
    })
  }


}