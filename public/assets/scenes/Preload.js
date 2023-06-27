export default class Preload extends Phaser.Scene {
    constructor() {
      super("Preload");
    }

preload(){
  //nuevo juego

 this.load.image("background", "./public/assets/images/Background.png");
 this.load.image("background2", "./public/assets/images/Background2.png");
 this.load.image("background3", "./public/assets/images/Background3.png");
 this.load.image("background4", "./public/assets/images/Background4.png");
 this.load.image("background5", "./public/assets/images/Background5.png");
 this.load.image("background5,5", "./public/assets/images/Background5,5.png");
 this.load.image("background6", "./public/assets/images/Background6.png");
 this.load.image("background7", "./public/assets/images/Background7.png");
 this.load.image("interfaz", "./public/assets/images/interfaz.png");
 this.load.image("botonI", "./public/assets/images/boton_inicio.png");
 this.load.image("title", "./public/assets/images/Title.png");
 this.load.image("loading", "./public/assets/images/loading.png");
 this.load.image("canon", "./public/assets/images/canon.png");
 this.load.image("scope", "./public/assets/images/scope.png");
 this.load.image("asteroid", "./public/assets/images/asteroid.png");
 this.load.image("platform", "./public/assets/images/platform.png");
 this.load.image("explosion", "./public/assets/images/explosion.png");
 this.load.image("decoracion", "./public/assets/images/decoraciones_menu.png");
 this.load.image("sound", "./public/assets/images/sound.png");
 this.load.image("soundOff", "./public/assets/images/soundOff.png");
 this.load.image("botonInt", "./public/assets/images/boton_interfaz.png");
 this.load.image("crack", "./public/assets/images/crack.png");
 this.load.image("life1", "./public/assets/images/life1.png");
 this.load.image("life2", "./public/assets/images/life2.png");
 this.load.image("life3", "./public/assets/images/life3.png");
 this.load.image("reset", "./public/assets/images/reset.png");
 this.load.image("tienda", "./public/assets/images/tienda.png");


 this.load.spritesheet("spritesheetCanon", "./public/assets/images/spritesheetCanon.png",{
  frameWidth: 325,
  frameHeight: 338,
});

 this.load.audio("musicMenu", "./public/assets/audio and music/menuMusic.mp3");
 this.load.audio("musicGame", "./public/assets/audio and music/GAMEMusic.mp3");
 this.load.audio("Explosion", "./public/assets/audio and music/esplosión.mp3");



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
.on('pointerdown', () => this.scene.start("Level1")); ;
  
   /*  this.time.addEvent({
      delay: 6000,
      callback: this.scene.start("Menu"),
      callbackScope: this,
      loop: false,
    });
 */
//
}












}