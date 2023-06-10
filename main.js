import Nivel_1 from "./public/assets/scenes/Nivel_1.js";
import Menu from "./public/assets/scenes/Menu.js";
import Tienda from "./public/assets/scenes/Tienda.js";
import Final from "./public/assets/scenes/Final.js";
import Preload from "./public/assets/scenes/Preload.js";


// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: true,
    },
  },
  
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  scene: [Preload, Menu, Nivel_1, Tienda, Final],
};



// Create a new Phaser game instance
window.game = new Phaser.Game(config);