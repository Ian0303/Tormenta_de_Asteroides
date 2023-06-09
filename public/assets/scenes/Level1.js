// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Level1 extends Phaser.Scene {
  score; isMusicMuted; cantAsteroides;
  constructor() {
    
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("Level1");
  }

  init({ isMusicMuted, musicM, score, cantAsteroides}) {
    this.score = 0;
    this.cantAsteroides = 0;

    this.vidas = 3;
    this.gameOver = false;
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
    this.add.image(400, 20, "background5,5").setScale(0.5);
    this.add.image(40, 550, "botonInt").setScale(0.5).setInteractive()
      .on('pointerdown', () => this.scene.start('Menu'));;;
    this.add.image(680, 530, "background5").setScale(0.45);
    //this.add.image(680, 530, "life").setScale(0.6);
    //this.add.image(200, 450, "ayuda2").setScale(0.8)


    let isMusicMuted = this.isMusicMuted;
    let musicM = this.musicM;
    let cantAsteroides = 0;
    
    let ayuda = this.physics.add.staticGroup()
    .create(200, 450, "ayuda2")
    .setScale(0.8)
    .setInteractive()
    .on('pointerdown', () => ayuda.destroy())
    ;

    this.vidasImagen = this.add
    .image(789, 517, "life3")
    .setOrigin(1, 0)
    .setScale(0.7);
   
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
      .setDepth(2);
      //.setColliderWorldBounds(true);

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

    this.scoreText = this.add.text(380, 12, this.score, {
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
    this.timer = 35;
    
    

    // animaciones del cañon (solo al disparar)
    this.anims.create({
      key: "turn",
      frames: this.anims.generateFrameNumbers("spritesheetCanon", { frame: 4}),
      frameRate: 20
    });
   


    //Funcion para reiniciar musica(no funciona)
    /*  if (!isMusicMuted) {
       this.musicM.stop();
       this.musicM.start();
       
     } */


     //CODIGO COPIADO POSIBLES FUNCIONES

    //const map = this.make.tilemap({ key: "map" });

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    //const capaFondo = map.addTilesetImage("sky", "tilesFondo");
    //const capaPlataformas = map.addTilesetImage("platform", "tilesPlataforma");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
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


    if (this.vidas <= 0) {
      this.scene.start("GameOver");
    }

    
  }

  
  //función de spawn de ateroides (descartada)
  /* spawnAsteroid(randomNumber) {
    let asteroid = this.add.image(randomNumber, 50, "asteroid");
    this.physics.add.existing(asteroid);
    asteroid.body.setCircle(25, 7, 7);
    this.add(asteroid);
     */

  addShape() {
    //devuelve una posición x aleatoria
    const randomX = Phaser.Math.RND.between(20, 780);

    //añade un asteroide
    this.asteroidGroup
      .create(randomX, 0, "asteroid")
      .setScale(0.8)
      .setCircle(45, 0, 0)
      .setDepth(1);
  }

  // codigo copiado, posibles funciones
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

// destruye los asteroides que estan debajo de la mira(player) cunado se preciona la barra espaciadora,
// suma puntos, la cantidad de asteroides destruidos y debe cambiar el sprite de "asteroide" por el de "explsion".(no funciona)
  destruirAsteroides(player, asteroid) {
    if (this.cursors.space.isDown) {
      asteroid.destroy()
      this.score = this.score + 35;
      this.scoreText.setText(this.score);
      this.cantAsteroides++;
      console.log(this.cantAsteroides)
      //this.add.image(asteroid.x(), 500, "explosion");
    }
  }

  //funcion inicial de gameOver(descartada)
 /*  setGameOver(platform, asteroid) {
    if (asteroid.texture.key == "asteroid") {
      asteroid.destroy();
    } else {
      this.gameOver = true;
    }
  } */

  //esta funcion debe usar la funcion "actualizarBarraVida()" para poducir un cambio en la barra de vida
  /* impactoAsteroide(platform, asteroid) {
    this.actualizarBarraVida(0.2)
    asteroid.destroy();
    console.log(this.vida)
  }

  actualizarBarraVida(porcentaje) {
    //  el porcentaje debe estar dentro del rango válido (entre 0 y 1)
    // el porcentaje se le asigna a la variable "scaleX" de la variable "vida" 
    porcentaje = Phaser.Math.Clamp(porcentaje, 0, 1);

    // actualiza la escala de la barra de vida según el porcentaje
    this.vida.scaleX = porcentaje;
  } */
  impactoAsteroide(platform, asteroid) {
    this.vidas--;
    this.crearExplosion(asteroid.x, asteroid.y)

    switch (this.vidas) {
      case 2:
        this.vidasImagen.setTexture("life2");
        break;
      case 1:
        this.vidasImagen.setTexture("life1");
        break;
      case 0:
        this.vidasImagen.setTexture("0Vidas");
        break;
    }
    //789, 517
    this.vidasImagen.x = 789;
    this.vidasImagen.y = 517;
    asteroid.destroy();
    if (this.vidas === 0) {
// aca acción a realizar cuando vidas sea igual a "0"
      this.scene.start("GameOver", {score: this.score, cantAsteroides: this.cantAsteroides})
    }
  }
  crearExplosion(x, y) {
    this.explosion = this.add.sprite(x, y, "explosion").setScale(0.5); // Ajusta el valor de escala según tus necesidades
    this.explosion.setOrigin(0.5, 0.5); // Ajusta el origen del sprite para que la posición sea relativa al centro
    this.explosion.on("animationcomplete", () => {
      this.explosion.destroy();
    }, this);
    this.explosion.play("Explosion");
  }

  onSecond(){
    this.timer--;
    if (this.timer === 0) {
      this.scene.start("Win",{score: this.score, cantAsteroides: this.cantAsteroides})
    }
  }
}
