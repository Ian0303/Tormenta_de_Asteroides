export default class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  preload(){
    this.load.image("gameOver", "./public/assets/images/GameOver.png");

  }
  create() {
    this.add.image(400, 300, "background")
    
    .setInteractive()
    .on('pointerdown', () => this.scene.start('hello-world')); ;
  
   

  }
  

}
