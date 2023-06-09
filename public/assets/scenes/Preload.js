export default class Preload extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("Preload");
    }

    init() {

    

    }

    Preload() {

        this.load.image("background", "./public/assets/images/Background.png");
        this.load.image("interfaz", "./public/assets/images/interfaz.png");
        this.load.image("title", "./public/assets/images/Title.png");
        this.load.image("background2", "./public/assets/images/Background2.png");
        this.load.image("boton_inicio", "./public/assets/images/boton_inicio.png");

    }
    
    //setInteractive()

    create() {
    
    }
    
    update() {
    
    }

}