export default class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  
  create() {
    this.add.image(400, 300, "background");
    //this.add.image(400, 300, "interfaz").setScale(0.5);
    this.add.image(400, 300, "background3").setScale(0.5);;
    this.add.image(265, 400, "botonInt").setInteractive().on('pointerdown', () => this.scene.start("Menu")); ;
    this.add.image(555, 400, "reset").setScale(0.2).setInteractive().on('pointerdown', () => this.scene.restart("Level1")); ;
    

    this.gameOverText = this.add.text(170, 120, "¡Nave",{
      fontSize: "70px",
      fontStyle: "bold",
      frontFamily: "Console",
      color: '#ffffff',
      stroke: '#ff8800',
      strokeThickness: 4,
    }); this.gameOverText = this.add.text(190, 200, "Destruida!",{
      fontSize: "70px",
      fontStyle: "bold",
      frontFamily: "Console",
      color: '#ffffff',
      stroke: '#ff8800',
      strokeThickness: 4,
    });
    
   

  }
  

}
