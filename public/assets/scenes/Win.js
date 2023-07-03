export default class Win extends Phaser.Scene {
  score; isMusicMuted; cantAsteroides;
    constructor() {
      super("Win");
    }
  
    init({ isMusicMuted, musicM, score, cantAsteroides }) {
      this.score = score;
      this.gameOver = false;
      this.vida = 1;
      this.cantMisil = 5;
      this.isMusicMuted = isMusicMuted;
      this.musicM = musicM;
     cantAsteroides = cantAsteroides
    }
  

    create(data) {
      this.add.image(400, 300, "background");
      //this.add.image(400, 300, "interfaz").setScale(0.5);
      this.add.image(400, 300, "background4").setScale(0.5);;
      this.add.image(400, 420, "tienda").setScale(0.5).setInteractive().on('pointerdown', () => this.scene.start("Menu")); ;
     
      
  
      this.gameOverText = this.add.text(170, 120, "¡¡Camino",{
        fontSize: "55px",
        fontStyle: "bold",
        frontFamily: "Console",
        color: '#ffffff',
        stroke: '#00ff00',
        strokeThickness: 4,
      }); 
      this.gameOverText = this.add.text(270, 180, "Despejado!!",{
        fontSize: "55px",
        fontStyle: "bold",
        frontFamily: "Console",
        color: '#ffffff',
        stroke: '#00ff00',
        strokeThickness: 4,
      });
      this.gameOverText = this.add.text(200, 270, "Puntos conseguidos:" + data.score,{
        fontSize: "24px",
        fontStyle: "bold",
        frontFamily: "Console",
        color: '#000000',
        })
        this.gameOverText = this.add.text(200, 320, "Asteroides destruidos:" + data.cantAsteroides,{
          fontSize: "24px",
          fontStyle: "bold",
          frontFamily: "Console",
          color: '#000000',
          })
          /* this.gameOverText = this.add.text(150, 300, "Puntos anteriores:" + this.score,{
            fontSize: "25px",
            fontStyle: "bold",
            frontFamily: "Console",
            color: '#000000',
            }) */
     
  
    }
    
  
  }