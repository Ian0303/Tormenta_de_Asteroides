export default class Preload extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("Preload");
    }

    init() {

    

    }

    Preload() {
        
        this.load.image("backgrond", "./public/assets/images/Background.png");

    }
    
    //setInteractive()

    create() {
    
    }
    
    update() {
    
    }

}