export default class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  preload(){
    this.load.image("gameOver", "./public/assets/images/GameOver.png");

  }
  create() {
    this.add.image(400, 300, "background");
    this.add.image(400, 300, "interfaz").setScale(0.5);
    this.add.image(40, 550, "botonInt").setScale(0.5).setInteractive().on('pointerdown', () => this.scene.start("Menu")); ;
  


    
   

  }
  

}
