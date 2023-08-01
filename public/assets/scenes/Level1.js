// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Level1 extends Phaser.Scene {
  isMusicMuted;
  constructor() {

    // key of the scene
    // the key will be used to start the scene by other scenes
    super("Level1");
  }

  init({ isMusicMuted, musicM }) {
    this.score1 = 0;

    this.cantAsteroides1 = 0;

    this.vidasMax = 3;
    this.vidas = this.vidasMax;

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


    this.add.image(400, 300, "background");
    //this.add.sprite(400, 452, "canon").setScale(0.5);

    this.add.image(400, 300, "interfaz").setScale(0.5);
    
    this.add.image(400, 20, "background5,5").setScale(0.5);
    this.add.image(40, 550, "botonInt").setScale(0.5).setInteractive()
      .on('pointerdown', () => this.scene.start('Menu'));
    this.add.image(680, 530, "background5").setScale(0.45);
    this.add.image(680, 570, "background5").setScale(0.45);


    //musica, aún no implementada
    /* this.isMusicMuted = this.isMusicMuted;
    this.musicM = this.musicM; */

    //varaiables booleanas de recargar los cañones, pausa, los escudos y muerte
    this.load = true;
    this.pause = false;
    this.shield = false;
    this.dead = false;

    //velosidad player
    this.velocityIZQ = -250;
    this.velocityDER = 250;
    this.velocityABA = 250;
    this.velocityARI = -250;

    //pop-up de ayuda con los controles
    let ayuda = this.physics.add.staticGroup()
      .create(200, 450, "ayuda2")
      .setScale(0.8)
      .setInteractive()
      .on('pointerdown', () => ayuda.destroy())
      ;
    setTimeout(() => {
      ayuda.destroy()
    }, 2000);

    //imagen inicial de vidas del jugador
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
      .setDepth(3)
      .setCollideWorldBounds(true);
    //.setCollideWorldBounds(true);

    this.playerGroup = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    });

    /* this.misileGroup = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    });

    this.misileGroup.add(this.misil) */
    this.playerGroup.add(this.player);
    this.asteroidGroup = this.physics.add.group();
    /*
    this.misileGroup = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    })
    //.setGravityY(0)
    .setVelocity(0, -350);
 */

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

    //variable para activar el lanzamiento de los misiles
    this.cursors = this.input.keyboard.createCursorKeys();
    //this.teclaM = this.input.keyboard.createCursorKeys();
    let teclaM = Phaser.Input.Keyboard.KeyCodes.M;
    /* this.teclaM = this.input.keyboard.on("keydown_M", () => {
      this.launchMisile();
    }); */


    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(platforms, this.asteroidGroup);

    //this.physics.add.collider(this.misil, this.asteroidGroup);

     //overlap del misil RAZÓN POR LA CUAL FALLA EL JUEGO.
     /*  this.physics.add.overlap(
      this.misileGroup,
      this.asteroidGroup,
      this.destruirAsteroides2,
      null,
      this
    ); 
 */
    
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

    /* let misil = this.physics.add
    .sprite(this.player.x, 600, "misile")
    .setOrigin(1)
    .setScale(0.5)
    .setDepth(1)
    .setVelocityY(-350)
    .setVisible(true)
    .setCollideWorldBounds(true)
    .setGravity(0)
    setTimeout(() => misil.destroy(), 4000);

    this.misileGroup.add(this.misil) */

    this.scoreText = this.add.text(380, 12, this.score1, {
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
    this.timer = 32;



    // animaciones del cañon (solo al disparar)
   /*  this.anims.create({
      key: "turn",
      frames: this.anims.generateFrameNumbers("spritesheetCanon", { frame: 4 }),
      frameRate: 20
    }); */

 //console.log(Phaser.Input.Keyboard.KeyCode);

    //Funcion para reiniciar musica(no funciona)
    /*  if (!isMusicMuted) {
       this.musicM.stop();
       this.musicM.start();
       
     } */

   /*  //timer
    this.timer = 35;
    this.timerText = this.add.text(700, 20, this.timer, {
      fontSize: "32px",
      fontStyle: "bold",
      fill: "#000",
    }); */

    this.time.addEvent({
      delay: 1000,
      callback: this.onSecond,
      callbackScope: this,
      loop: true,
    });
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

    /* if (this.misil.setVisible(false)) {
      this.emitter.setVisible(false)
    } */
    //activación de la funcion para lanzar un misil
       /* if (this.cantMisil>0) {
        this.input.keyboard.on('keydown-M', this.launchMisile, this,);
    }   */

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
      this.score1 += 35;
      this.scoreText.setText(this.score1);
      this.cantAsteroides1++;
      console.log("Puntos: " + this.score1)
      console.log("Asteroides destruidos: " + this.cantAsteroides1)
      this.load = false
      setTimeout(() => {//coltdown
        this.load = true
      }, 100);
      //this.direccion = Phaser.Math.sin(this.asteroidGroup.y/(Math.sqrt((400**2) + (this.asteroidGroup.y**2))))
      //console.log(this.direccion);
    }
  }


  impactoAsteroide(platform, asteroid) {
    this.vidas--;
    asteroid.destroy();
    this.crearExplosion(asteroid.x, asteroid.y)

    switch (this.vidas) {
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

  /*
 asteroid.setTexture("explosion").setScale(0.5);
    setTimeout(() => {
      asteroid.destroy();
    },100);
    this.explosion.play("Explosion");
  */

  gameOver() {
    this.gameOverI = this.add.image(400, 300, "background3").setScale(0.5);
    this.botonInt = this.add.image(265, 400, "botonInt").setInteractive().on('pointerdown', () => this.scene.start("Menu"));
    this.reset = this.add.image(555, 400, "reset").setScale(0.2).setInteractive().on('pointerdown', () => this.scene.start("Level1"));
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
    this.mejoras = this.add.image(400, 420, "updates").setScale(0.25).setInteractive().on('pointerdown', () => this.updates());
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
    this.pointsText = this.add.text(200, 270, "Puntos conseguidos:" + this.score1, {
      fontSize: "24px",
      fontStyle: "bold",
      frontFamily: "Console",
      color: '#000000',
    })
    this.cantAText = this.add.text(200, 320, "Asteroides destruidos:" + this.cantAsteroides1, {
      fontSize: "24px",
      fontStyle: "bold",
      frontFamily: "Console",
      color: '#000000',
    })
  }

  updates() {
    this.winI.destroy();
    this.mejoras.destroy();
    this.winText1.destroy();
    this.winText2.destroy();
    this.pointsText.destroy();
    this.cantAText.destroy();
    this.player.setVisible(false);
    this.updatesI = this.add.image(400, 300, "background6").setScale(0.5);
    this.updatesText = this.add.text(180, 130, "Elige una mejora ", {
      fontSize: "45px",
      fontStyle: "bold",
      frontFamily: "Console",
      color: '#0000FF',
    })


    //mejoras
    this.update1Esc = this.add.image(230, 270, "update1Esc")
      .setScale(0.5)
      .setInteractive()
      .setDepth(4)
      .on('pointerdown', () => this.update1())
      .on('pointerdown', () => this.scene.start('Level2', {
        score1: this.score1,
        scoreTotal: this.score1,
        cantAsteroides1: this.cantAsteroides1,
        shield: this.shield,
        vidasMax: this.vidasMax,
        velocityABA: this.velocityABA,
        velocityARI: this.velocityARI,
        velocityDER: this.velocityDER,
        velocityIZQ: this.velocityIZQ
      }));
    this.update2Vel = this.add.image(400, 270, "update2Vel")
      .setScale(0.5)
      .setInteractive()
      .setDepth(4)
      .on('pointerdown', () => this.update2())
      .on('pointerdown', () => this.scene.start('Level2', {
        score1: this.score1,
        scoreTotal: this.score1,
        cantAsteroides1: this.cantAsteroides1,
        shield: this.shield,
        vidasMax: this.vidasMax,
        velocityABA: this.velocityABA,
        velocityARI: this.velocityARI,
        velocityDER: this.velocityDER,
        velocityIZQ: this.velocityIZQ
      }));
    this.update3Dur = this.add.image(570, 270, "update3Dur")
      .setScale(0.5)
      .setInteractive()
      .setDepth(4)
      .on('pointerdown', () => this.update3())
      .on('pointerdown', () => this.scene.start('Level2', {
        score1: this.score1,
        scoreTotal: this.score1,
        cantAsteroides1: this.cantAsteroides1,
        shield: this.shield,
        vidasMax: this.vidasMax,
        velocityABA: this.velocityABA,
        velocityARI: this.velocityARI,
        velocityDER: this.velocityDER,
        velocityIZQ: this.velocityIZQ
      }));
    }
  update1() {
    this.shield = true
    console.log("shield: " + this.shield)
    console.log("puntaje total: " + this.score1)
    console.log("asteroide destruidos en total: " + this.cantAsteroides1)
  }

  update2() {
    this.velocityIZQ = this.velocityIZQ - 25;
    this.velocityDER = this.velocityDER + 25;
    this.velocityABA = this.velocityABA + 25;
    this.velocityARI = this.velocityARI - 25;
    console.log("velocityIZQ: " + this.velocityIZQ)
    console.log("velocityDER: " + this.velocityDER)
    console.log("velocityABA: " + this.velocityABA)
    console.log("velocityARI: " + this.velocityARI)
    console.log("puntaje total: " + this.score1)
    console.log("asteroide destruidos en total: " + this.cantAsteroides1)

  }

  update3() {
    this.vidasMax = this.vidasMax + 1;
    console.log("vidas: " + this.vidasMax)
    console.log("puntaje total: " + this.score1)
    console.log("asteroide destruidos en total: " + this.cantAsteroides1)

  }

//funcion para disprar el misil, utlizando las cordenadas del asteroide debe calcular el algulo de la direccion y la distancia para dirigir el misil hacia el asteroide.
  launchMisile() {
    if (this.cantMisil>0 && this.load === true) {

      //.setGravity(0) .body.gravity.y = 0 ;
    console.log("fire?")

    /* this.particles = this.add.particles("grey");
    //emisor de particulas
    this.emitter = this.particles.createEmitter({
      speed: 50,
      scale: { start: 0.2, end: 0 },
      blendMode: "ADD",
    }); 
    this.emitter.startFollow(this.misil); */
    
    this.cantMisil--;
    this.misilText.setText(this.cantMisil);

    this.physics.moveTo(
      misil,
      this.asteroid.x,
      this.asteroid.y,
      -350
    );

    /* this.misileGroup.children.create((this.misil),{
      allowGravity : false,
    })
 */
    /* this.misil.setGravity(() =>
    {this.gravity.y = 0;
        return this;}), */

    //this.misil.body.allowGravity = false;
    

    //this.physics.add.collider(this.misileGroup, this.asteroidGroup);
    //this.physics.add.overlap(this.misilGroup, this.asteroidGroup, this.destruirAsteroides2, null, this);
    
    //ECUACION: θ=arc sen(h / √(x² + h²))
        // this.direccion = Phaser.Math.sin(this.asteroidGroup.y/(Math.sqrt((400**2) + (this.asteroidGroup.y**2))))
        //console.log(this.direccion);


        //SOLUCION PROPUESTA POR CHATGPT.
        // Calcular la dirección y la distancia entre los objetos
    // var direccion = Phaser.Math.Angle.Between(misil.x, misil.y, this.asteroidGroup.x, this.asteroidGroup.y);
    // var distancia = Phaser.Math.Distance.Between(misil.x, misil.y, this.asteroidGroup.x, this.asteroidGroup.y);
                
    // Mover el objeto que sigue en la dirección calculada y con la velocidad de seguimiento
    // Phaser.Actions.ShiftPosition([misil], Math.cos(direccion) * velocidadSeguimiento * delta / 1000, Math.sin(direccion) * velocidadSeguimiento * delta / 1000);
    this.load = false
    setTimeout(() => {//coltdown
      this.load = true
    }, 300);
}

  }
  destruirAsteroides2(){
    console.log("kaboom?")
  }

}
