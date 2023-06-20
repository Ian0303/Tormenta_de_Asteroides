// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Level1 extends Phaser.Scene {
  score; isMusicMuted;
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("Level1");
  }

  init({isMusicMuted,musicM}) {
    this.score = 0;
    this.gameOver = false;
    this.vida = 5;
    this.cantMisil = 5;
    this.isMusicMuted = isMusicMuted;
    this.musicM = musicM;
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
  }

  create() {
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
    this.add.image(400, 452, "canon").setScale(0.5);
    this.add.image(400, 300, "interfaz").setScale(0.5);
    this.add.image(40, 550, "botonInt").setScale(0.5).setInteractive()
    .on('pointerdown', () => this.scene.start('Menu')); ;;

    
    let isMusicMuted = this.isMusicMuted;
    let musicM = this.musicM;

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
      .setDepth(2);

    this.playerGroup = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    });
    this.playerGroup.add(this.player);
    this.asteroidGroup = this.physics.add.group();

    this.time.addEvent({
      delay: 3000,
      callback: this.addShape,
      callbackScope: this,
      loop: true,
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(this.player, platforms);
    this.physics.add.overlap(this.player, this.asteroidGroup);

    /* this.physics.add.overlap(
      this.platforms, 
      this.asteroid,
      this.impactoAsteroide,
      null,
      this
      ); */

    this.physics.add.overlap(
      this.player,
      this.asteroidGroup,
      this.destruirAsteroides,
      null,
      this
    );

  /*   this.physics.add.overlap(
    this.platform,
    this.asteroidGroup,
    this.impactoAsteroide,
    null,
    this
  ); */
 
    this.scoreText = this.add.text(10, 10, this.score, {
      fontSize: "32px",
      fontStyle: "bold",
      frontFamily: "Console",
      
      fill: "#33CC33",
    }); 

    this.scoreText = this.add.text(150, 530, this.cantMisil, {
      fontSize: "32px",
      fontStyle: "bold",
      frontFamily: "Console",
      
      fill: "#33CC33",
    });

      /* if (!isMusicMuted) {
        this.musicM.stop();
        this.musicM.start();
        
      } */
    //const map = this.make.tilemap({ key: "map" });

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    //const capaFondo = map.addTilesetImage("sky", "tilesFondo");
    //const capaPlataformas = map.addTilesetImage("platform", "tilesPlataforma");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    //const fondoLayer = map.createLayer("fondo", capaFondo, 0, 0);
    /* const plataformaLayer = map.createLayer(
      "plataformas",
      capaPlataformas,
      0,
      0
    );
    const objectosLayer = map.getObjectLayer("objetos"); */

    //plataformaLayer.setCollisionByProperty({ colision: true });

    /* 
    this.jugador = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "dude");

    //  Player physics properties. Give the little guy a slight bounce.
    this.jugador.setBounce(0.1);
    this.jugador.setCollideWorldBounds(true);

    // Input Events*/

    /*
    // Create empty group of starts
    this.estrellas = this.physics.add.group();
    spawnPoint = map.findObject("objetos", (obj) => obj.name === "salida");
    console.log("spawn point exit ", spawnPoint);
    this.salida = this.physics.add
      .sprite(spawnPoint.x, spawnPoint.y, "exit")
      .setScale(0.05);
    this.salida.visible = false;
    


    // find object layer
    // if type is "stars", add to stars group
    objectosLayer.objects.forEach((objData) => {
      //console.log(objData.name, objData.type, objData.x, objData.y);

      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "estrella": {
          // add star to scene
          // console.log("estrella agregada: ", x, y);
          const star = this.estrellas.create(x, y, "star");
          break;
        }
      }
    });

    this.physics.add.collider(this.jugador, plataformaLayer);
    this.physics.add.collider(this.estrellas, plataformaLayer);
    this.physics.add.collider(this.salida, plataformaLayer);
    this.physics.add.collider(
      this.jugador,
      this.estrellas,
      this.recolectarEstrella,
      null,
      this
    );
    this.physics.add.collider(
      this.jugador,
      this.salida,
      this.pasarNivel,
      null,
      this
    );

    // todo / para hacer: texto de puntaje
    this.score = 0;
    this.scoreText = this.add.text(20, 20, "Score:" + this.score, {
      fontSize: "32px",
      fontStyle: "bold",
      fill: "#ffffff",
    });

    //timer
    this.timer = 30;
    this.timerText = this.add.text(700, 20, this.timer, {
      fontSize: "32px",
      fontStyle: "bold",
      fill: "#000",
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.onSecond,
      callbackScope: this,
      loop: true,
    });*/
  }

  update() {
    // update game objects
    // check input
    //moverse izquierda
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-250);
    }
    //moveese derecha
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(250);
    }
    //moverse abajo
    else if (this.cursors.down.isDown) {
      this.player.setVelocityY(250);
    }
    //moverse arriba
    else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-250);
    } else {
      this.player.setVelocity(0);
    }


    if (this.vida <= 0) {
      this.scene.start("GameOver");
    }
  }

  /* spawnAsteroid(randomNumber) {
    let asteroid = this.add.image(randomNumber, 50, "asteroid");
    this.physics.add.existing(asteroid);
    asteroid.body.setCircle(25, 7, 7);
    this.add(asteroid);
     */

  addShape() {
    //get random position x
    const randomX = Phaser.Math.RND.between(0, 800);

    //add shape to screen
    this.asteroidGroup
      .create(randomX, 0, "asteroid")
      .setScale(0.8)
      .setCircle(45, 0, 0)
      .setDepth(1);
  }

  /*
  recolectarEstrella(jugador,estrella) {
    estrella.disableBody(true, true);
    //this.score = this.score + 10;
    //console.log(this.score);
      this.score++;
      this.scoreText.setText(
        "Score:" + this.score
      );
    if (this.estrellas.getTotalUsed() == 0) {
      this.salida.visible = true;
      this.score--
    }
  }
  pasarNivel(salida) {
    if (this.salida.visible === true) {
      this.scene.start("Juego2",{score: this.score,});
      
    }
  }
  onSecond() {
    this.timer--;
    this.timerText.setText(this.timer);
    if (this.timer <= 0) {
      this.gameOver = true;
    }
  } */

  destruirAsteroides(platform, asteroid) {
    if (this.cursors.space.isDown) {
      asteroid.destroy();
      this.score = this.score + 35;
    }
  }

  setGameOver(platform, asteroid) {
    if (asteroid.texture.key == "asteroid") {
        asteroid.destroy();
    }else{
        this.gameOver = true;
    }   
  }

  impactoAsteroide(platform, asteroid) {
    this.vida--;
    this.asteroid.destroy();
    console.log(this.vida)
  

    

  }
}
