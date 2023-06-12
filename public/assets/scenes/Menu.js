export default class Menu extends Phaser.Scene {
    constructor() {
      super("Menu");
    }



create(){
    this.add.image(400, 300, "background");
    this.add.image(400, 300, "background2");
    this.add.image(400, 300, "title");
    this.add.image(400, 300, "botonI").setInteractive()
    .on('pointerdown', () => this.scene.start('Level1')); ;
}
















}