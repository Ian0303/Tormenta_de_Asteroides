export default class Win extends Phaser.Scene {
    constructor() {
      super("Win");
    }
  
    preload(){
      this.load.image("win", "./public/assets/images/win.png");
  
    }
    create() {
      this.add.image(400, 300, "win")
      .setScale(0.5)
      .setInteractive()
      .on('pointerdown', () => this.scene.start('hello-world')); ;
    
     
  
    }
    
  
  }