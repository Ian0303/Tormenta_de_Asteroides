export default class Preload extends Phaser.Scene {
    constructor() {
      super("Preload");
    }

preload(){
  //nuevo juego

 this.load.image("background", "./public/assets/images/Background.png");
 this.load.image("background2", "./public/assets/images/Background2.png");
 this.load.image("interfaz", "./public/assets/images/interfaz.pNg");
 this.load.image("botonI", "./public/assets/images/boton_inicio.png");
 this.load.image("title", "./public/assets/images/Title.png");
 this.load.image("loading", "./public/assets/images/loading.png");
 this.load.image("canon", "./public/assets/images/canon.png");
 this.load.image("scope", "./public/assets/images/scope.png");
 this.load.image("asteroid", "./public/assets/images/asteroid.png");
 this.load.image("platform", "./public/assets/images/platform.png");



  //viejo juego
  //this.load.tilemapTiledJSON("map", "./public/tilemaps/nivel1.json");


  this.load.image("gameOver", "./public/assets/images/GameOver.png");

  this.load.spritesheet("dude", "./public/assets/images/dude.png", {
    frameWidth: 32,
    frameHeight: 48,
  });

}

create(){
  this.add.image(400, 300, "background");
  this.add.image(400, 300, "background2");
  this.add.image(400, 300, "title");
  this.add.image(400, 300, "loading").setInteractive()
    .on('pointerdown', () => this.scene.start("Menu")); ;
  
}












}