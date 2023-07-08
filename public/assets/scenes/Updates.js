export default class Updates extends Phaser.Scene {
    constructor() {
      super("Updates");
    }
    create(){
      this.mejoras = this.add.image(400, 420, "updates").setScale(0.25).setInteractive().on('pointerdown', () => this.updates());

    }
    updates(){
      this.winI.destroy();
      this.mejoras.destroy();
      this.winText.destroy();
      this.pointsText.destroy();
      this.cantAText.destroy();
      this.player.setVisible(false);
      this.updatesI = this.add.image(400, 300, "background6").setScale(0.5);
      this.updatesText = this.add.text(200, 320, "Elige una mejora " ,{
        fontSize: "24px",
        fontStyle: "bold",
        frontFamily: "Console",
        color: '#0000FF',
        })
  
      this.pause = true;
    
      //mejoras
    this.update1Esc = this.add.image(250, 300, "update1Esc").setScale(0.5).setInteractive()
    .on('pointerdown', () => this.update1());
    this.update2Vel = this.add.image(400, 300, "update2Vel").setScale(0.5).setInteractive()
    .on('pointerdown', () => this.update2());
    this.update4Dur = this.add.image(550, 300, "update3Dur").setScale(0.5).setInteractive()
    .on('pointerdown', () => this.update3());
  
    this.next = this.add.image(400, 250, "next").setScale(0.5).setInteractive()
    .on('pointerdown', () => this.scene.start('Level2', {shield, vidas, velocityABA, velocityARI, velocityIZQ, velocityDER}));
    }
}