// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Level5 extends Phaser.Scene {
  isMusicMuted; cantAsteroides;
  constructor() {

    // key of the scene
    // the key will be used to start the scene by other scenes
    super("Level5");
  }

  init({ isMusicMuted, musicM, scoreTotal, cantAsteroidesTotal, shield, vidasMax, velocityABA, velocityARI, velocityDER, velocityIZQ }) {
    this.scoreTotal = scoreTotal;
    this.score5 = 0;

    this.cantAsteroidesTotal = cantAsteroidesTotal;
    this.cantAsteroides5 = 0;

    this.shield = shield;

    this.vidasMax = vidasMax;
    this.vidas = this.vidasMax;

    //velocity player
    this.velocityIZQ = velocityIZQ;
    this.velocityDER = velocityDER;
    this.velocityABA = velocityABA;
    this.velocityARI = velocityARI;

    this.cantMisil = 5;
    this.isMusicMuted = isMusicMuted;
    this.musicM = musicM;
    this.explosion = null;



    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
  }

  create(data) {
    //  Our player animations, turning, walking left and walking right.
    /*  this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("scope", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "scope", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("scope", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    }); */

    this.add.image(400, 300, "background");
    //this.add.sprite(400, 452, "canon").setScale(0.5);

    this.add.image(400, 300, "interfaz").setScale(0.5);
    ;
    this.add.image(400, 20, "background5,5").setScale(0.5);
    this.add.image(40, 550, "botonInt").setScale(0.5).setInteractive()
      .on('pointerdown', () => this.scene.start('Menu'));
    this.add.image(680, 530, "background5").setScale(0.45);
    this.add.image(680, 570, "background5").setScale(0.45);

    //escudo
    if (this.shield === true) {
      this.shieldImagen = this.add
        .image(680, 570, "shield1")
        .setScale(0.7)
    }

    this.isMusicMuted = this.isMusicMuted;
    this.musicM = this.musicM;
    this.load = true;
    this.pause = false;
    this.dead = false;

    switch (this.vidasMax) {
      case 7:
        this.vidasImagen = this.add
          .image(789, 517, "life7")
          .setOrigin(1, 0)
          .setScale(0.7);
        break;
      case 6:
        this.vidasImagen = this.add
          .image(789, 517, "life6")
          .setOrigin(1, 0)
          .setScale(0.7);
        break;
      case 5:
        this.vidasImagen = this.add
          .image(789, 517, "life5")
          .setOrigin(1, 0)
          .setScale(0.7);
        break;
      case 4:
        this.vidasImagen = this.add
          .image(789, 517, "life4")
          .setOrigin(1, 0)
          .setScale(0.7);
        break;
      case 3:
        this.vidasImagen = this.add
          .image(789, 517, "life3")
          .setOrigin(1, 0)
          .setScale(0.7);
        break;
    }

    // plataforma utilizada para la funciones encargadas de ka perdida de vida y gameOver
    let platforms = this.physics.add.staticGroup();
    platforms
      .create(400, 550, "platform")
      .setScale(2.5)
      .refreshBody()
      .setVisible(false);

    this.player = this.physics.add
      .sprite(400, 300, "scope")
      .setScale(0.5)
      .setCircle(60, 12, 28)
      .setDepth(3)
      .setCollideWorldBounds(true);

    this.playerGroup = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    });
    this.playerGroup.add(this.player);
    this.asteroidGroup = this.physics.add.group();

    this.time.addEvent({
      delay: 2000,
      callback: this.addShape,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.onSecond,
      callbackScope: this,
      loop: true,
    })



    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(this.player, platforms);
    this.physics.add.overlap(this.player, this.asteroidGroup);
    this.physics.add.collider(platforms, this.asteroidGroup);

    this.physics.add.overlap(
      this.player,
      this.asteroidGroup,
      this.destruirAsteroides,
      null,
      this
    );

    this.physics.add.overlap(
      platforms,
      this.asteroidGroup,
      this.impactoAsteroide,
      null,
      this
    );

    this.scoreText = this.add.text(380, 12, this.score5, {
      fontSize: "32px",
      fontStyle: "bold",
      frontFamily: "Console",

      fill: "#33CC33",
    });

    this.misilText = this.add.text(150, 530, this.cantMisil, {
      fontSize: "32px",
      fontStyle: "bold",
      frontFamily: "Console",

      fill: "#33CC33",
    });

    //timer
    this.timer = 62;



    // animaciones del cañon (solo al disparar)
    this.anims.create({
      key: "turn",
      frames: this.anims.generateFrameNumbers("spritesheetCanon", { frame: 4 }),
      frameRate: 20
    });



    //Funcion para reiniciar musica(no funciona)
    /*  if (!isMusicMuted) {
       this.musicM.stop();
       this.musicM.start();
       
     }*/
  }

  update() {
    // update game objects
    // check input
    //moverse izquierda
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(this.velocityIZQ);
    }
    //moveese derecha
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(this.velocityDER);
    }
    //moverse abajo
    else if (this.cursors.down.isDown) {
      this.player.setVelocityY(this.velocityABA);
    }
    //moverse arriba
    else if (this.cursors.up.isDown) {
      this.player.setVelocityY(this.velocityARI);
    } else {
      this.player.setVelocity(0);
    }




  }

  addShape() {
    if (this.pause === false) {

      //devuelve una posición x aleatoria
      const randomX = Phaser.Math.RND.between(20, 780);

      //añade un asteroide
      this.asteroidGroup
        .create(randomX, 0, "asteroid")
        .setScale(0.8)
        .setCircle(45, 0, 0)
        .setDepth(1);
    }
  }


  // destruye los asteroides que estan debajo de la mira(player) cunado se preciona la barra espaciadora,
  // suma puntos, la cantidad de asteroides destruidos y debe cambiar el sprite de "asteroide" por el de "explsion".(no funciona)
  destruirAsteroides(player, asteroid) {
    if (this.cursors.space.isDown && this.load === true) {
      asteroid.setTexture("explosion").setScale(0.5);
      setTimeout(() => {
        asteroid.destroy();
      }, 100);
      this.score5 += 35;
      this.scoreText.setText(this.score5);
      this.cantAsteroides5++;
      console.log("Puntos: " + this.score5);
      console.log("Asteroides destruidos: " + this.cantAsteroides5)
      this.load = false
      setTimeout(() => {//coltdown
        this.load = true
      }, 100);

    }
  }


  impactoAsteroide(platform, asteroid) {
    asteroid.destroy();
    this.crearExplosion(asteroid.x, asteroid.y)

    if (this.shield === true) {
      this.shieldImagen.destroy();
      this.shield = false;
    } else {
      this.vidas--;
      switch (this.vidas) {
        case 7:
          this.vidasImagen.setTexture("life7");
          break;
        case 6:
          this.vidasImagen.setTexture("life6");
          break;
        case 5:
          this.vidasImagen.setTexture("life5");
          break;
        case 4:
          this.vidasImagen.setTexture("life4");
          break;
        case 3:
          this.vidasImagen.setTexture("life3");
          break;
        case 2:
          this.vidasImagen.setTexture("life2");
          break;
        case 1:
          this.vidasImagen.setTexture("life1");
          break;
        case 0:
          this.vidasImagen.setTexture();
          break;
      }
    }
    //789, 517
    this.vidasImagen.x = 789;
    this.vidasImagen.y = 517;

    if (this.vidas === 0) {
      // aca acción a realizar cuando vidas sea igual a "0"
      this.gameOver();
    }
  }
  crearExplosion(x, y) {
    this.explosion = this.add.sprite(x, y, "explosion").setScale(0.5); // Ajusta el valor de escala según tus necesidades
    this.explosion.setOrigin(0.5, 0.5);// Ajusta el origen del sprite para que la posición sea relativa al centro
    setTimeout(() => {
      this.explosion.destroy();
    }, 100);
    this.explosion.on("animationcomplete", () => {

    }, this);
    this.explosion.play("Explosion");
  }

  onSecond() {
    this.timer--;
    if (this.timer === 0 && this.dead === false) {
      this.win()
    }
  }


  gameOver() {
    this.gameOverI = this.add.image(400, 300, "background3").setScale(0.5);
    this.botonInt = this.add.image(265, 400, "botonInt").setInteractive().on('pointerdown', () => this.scene.start("Menu"));
    this.reset = this.add.image(555, 400, "reset").setScale(0.2).setInteractive().on('pointerdown', () => this.scene.start("Level5"));
    this.player.setVisible(false);
    this.pause = true;
    this.dead = true;
    this.player.setVelocity(0,0).setMaxVelocity(0,0);

    this.gameOverText = this.add.text(170, 120, "¡Nave", {
      fontSize: "70px",
      fontStyle: "bold",
      frontFamily: "Console",
      color: '#ffffff',
      stroke: '#ff8800',
      strokeThickness: 4,
    }); this.gameOverText = this.add.text(190, 200, "Destruida!", {
      fontSize: "70px",
      fontStyle: "bold",
      frontFamily: "Console",
      color: '#ffffff',
      stroke: '#ff8800',
      strokeThickness: 4,
    });
  }

  win() {
    this.winI = this.add.image(400, 300, "background4").setScale(0.5);
    this.scoreTotal += this.score5;
    this.cantAsteroidesTotal += this.cantAsteroides5;
    console.log("Total puntos: " + this.scoreTotal);
    console.log("Total asteroides: " + this.cantAsteroidesTotal);

    this.mejoras = this.add.image(400, 420, "updates").setScale(0.25).setInteractive().on('pointerdown', () => this.scene.start('End'), {
      scoreTotal: this.scoreTotal,
      score5: this.score5,
      cantAsteroidesTotal: this.cantAsteroidesTotal,
      cantAsteroides5: this.cantAsteroides5
    });
    this.player.setVisible(false);
    this.pause = true;
    this.player.setVelocity(0,0).setMaxVelocity(0,0);
    

    this.winText1 = this.add.text(170, 120, "¡¡Camino", {
      fontSize: "55px",
      fontStyle: "bold",
      frontFamily: "Console",
      color: '#ffffff',
      stroke: '#00ff00',
      strokeThickness: 4,
    });
    this.winText2 = this.add.text(270, 180, "Despejado!!", {
      fontSize: "55px",
      fontStyle: "bold",
      frontFamily: "Console",
      color: '#ffffff',
      stroke: '#00ff00',
      strokeThickness: 4,
    });
    this.pointsText = this.add.text(200, 270, "Puntos conseguidos:" + this.score5, {
      fontSize: "24px",
      fontStyle: "bold",
      frontFamily: "Console",
      color: '#000000',
    })
    this.cantAText = this.add.text(200, 320, "Asteroides destruidos:" + this.cantAsteroides5, {
      fontSize: "24px",
      fontStyle: "bold",
      frontFamily: "Console",
      color: '#000000',
    })
  }
  /*  this.next = this.add.image(600, 370, "next").setScale(0.5).setInteractive()
     .on('pointerdown', () => this.scene.start('Level2', {})); */
}
//shield, vidas, velocityABA, velocityARI, velocityIZQ, velocityDER

