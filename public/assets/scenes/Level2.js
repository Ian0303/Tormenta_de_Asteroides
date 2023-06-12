// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Level2 extends Phaser.Scene {
    score;
    constructor() {
        // key of the scene
        // the key will be used to start the scene by other scenes
        super("Level2");
    }
  
    init({ score }) {
      this.score = score ;
      this.gameOver = false;
     
    }
  
    preload() {
        // load assets
        this.load.tilemapTiledJSON("map2", "./public/tilemaps/nivel2.json");
    }
  
    create() {
        const map = this.make.tilemap({ key: "map2" });
  
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        const capaFondo = map.addTilesetImage("sky", "tilesFondo");
        const capaPlataformas = map.addTilesetImage("platform", "tilesPlataforma");
  
        // Parameters: layer name (or index) from Tiled, tileset, x, y
        const fondoLayer = map.createLayer("fondo", capaFondo, 0, 0);
        const plataformaLayer = map.createLayer(
            "plataformas",
            capaPlataformas,
            0,
            0
        );
        const objectosLayer = map.getObjectLayer("objetos");
  
        plataformaLayer.setCollisionByProperty({ colision: true });
  
        console.log(objectosLayer);
  
        // crear el jugador
        let spawnPoint = map.findObject("objetos", (obj) => obj.name === "jugador");
        console.log(spawnPoint);
        // The player and its settings
        this.jugador = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "dude");
  
        //  Player physics properties. Give the little guy a slight bounce.
        this.jugador.setBounce(0.1);
        this.jugador.setCollideWorldBounds(true);
  
        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();
  
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
                case "bomb": {
                    this.bomb = this.physics.add
                        .sprite(spawnPoint.x, spawnPoint.y, "bomb")
                        .setScale(2)
                        .setVelocity(250, 350)
                        .setCollideWorldBounds(true)
                        .setBounce(1);
                    break;
                }
            }
        });
  
        this.physics.add.collider(this.jugador, plataformaLayer);
        this.physics.add.collider(this.estrellas, plataformaLayer);
        this.physics.add.collider(this.salida, plataformaLayer);
        this.physics.add.collider(this.bomb, plataformaLayer);
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
        this.physics.add.collider(
            this.jugador,
            this.bomb,
            this.boom,
            null,
            this
        );
  
        // todo / para hacer: texto de puntaje
        this.score++;
        this.scoreText = this.add.text(20, 20, "Score:" + this.score, {
            fontSize: "32px",
            fontStyle: "bold",
            fill: "#ffffff",
        });
  
        //timer
        this.timer = 40;
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
        });
  
  
        console.log("si")
    }
  
    update() {
        // update game objects
        // check input
        //move left
        if (this.cursors.left.isDown) {
            this.jugador.setVelocityX(-160);
            this.jugador.anims.play("left", true);
        }
        //move right
        else if (this.cursors.right.isDown) {
            this.jugador.setVelocityX(160);
            this.jugador.anims.play("right", true);
        }
        //stop
        else {
            this.jugador.setVelocityX(0);
            this.jugador.anims.play("turn");
        }
  
        //jump
        if (this.cursors.up.isDown && this.jugador.body.blocked.down) {
            this.jugador.setVelocityY(-330);
        }
  
        if (this.gameOver) {
            this.scene.start("GameOver");
        }
    }
  
    recolectarEstrella(jugador, estrella) {
        estrella.disableBody(true, true);
  
        this.score++;
        this.scoreText.setText(
            "Score:" + this.score
        );
  
        if (this.estrellas.getTotalUsed() == 0) {
            this.salida.visible = true;
            this.score--
        }
    }
  
    pasarNivel() {
        if (this.salida.visible === true) {
            this.scene.start("Juego3",{score: this.score});
            
        }
    }
  
    boom() {
        this.gameOver = true;
    }
  
    onSecond() {
        this.timer--;
        this.timerText.setText(this.timer);
        if (this.timer <= 0) {
            this.gameOver = true;
        }
    }
  
  
  }