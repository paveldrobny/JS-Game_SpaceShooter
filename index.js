import GameManager from "./gameManager.js";
import Player from "./Entities/Player.js";
import KEYS from "./keys.js";
import EnemyEasy from "./Entities/EnemyEasy.js";
import EnemyAverage from "./Entities/EnemyAverage.js";
import EnemyHigh from "./Entities/EnemyHigh.js";
import MainMenu from "./UI/Panels/MainMenu.js";
import ControlsMenu from "./UI/Panels/ControlsMenu.js";
import { Game, UI } from "./global.js";
import HUD from "./UI/Panels/HUD.js";
import GameOverMenu from "./UI/Panels/GameOver.js";
import HighScoreMenu from "./UI/Panels/HighScoreMenu.js";
import Bullet from "./Entities/Bullet.js";
import Particle from "./Entities/Particle.js";
import DebugMessage from "./UI/DebugMessage.js";
import localization from "./Localization/Parse.js";
import LanguageMenu from "./UI/Panels/LanguageMenu.js";

//#region Init
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const gameManager = new GameManager();
const player = new Player(
  55 * gameManager.getScale(),
  (gameManager.height / 2) * gameManager.getScale()
);

const mainMenuPanel = new MainMenu();
const highScoreMenu = new HighScoreMenu();
const languageMenu = new LanguageMenu();
const controlsMenuPanel = new ControlsMenu();
const hud = new HUD();
const gameOverPanel = new GameOverMenu();

let keyState = [];
let delayShoot = 0;
let Bullets = [];
let Enemies = [];
let Particles = [];

//#endregion

//#region Events
window.addEventListener("load", function () {
  gameManager.resize(canvas, context, gameManager.width, gameManager.height);
});

window.addEventListener("resize", function () {
  gameManager.resize(canvas, context, gameManager.width, gameManager.height);
});

window.addEventListener("keydown", (e) => {
  keyState[e.keyCode] = true;

  if (!Game.isPlay || Game.isGameOver) {
    if (e.keyCode == KEYS.W || e.keyCode == KEYS.ArrowUp) {
      switch (UI.panelUIIndex) {
        case 0:
          if (UI.mainMenuIndex > 0) UI.mainMenuIndex--;
          break;
        case 1:
          if (UI.controlsMenuIndex > 0) UI.controlsMenuIndex--;
          break;
        case 2:
          if (UI.languageMenuIndex > 0) UI.languageMenuIndex--;
          break;
        case 99:
          if (UI.gameOverMenuIndex > 0) UI.gameOverMenuIndex--;
          break;
      }
    }
    if (e.keyCode == KEYS.S || e.keyCode == KEYS.ArrowDown) {
      switch (UI.panelUIIndex) {
        case 0:
          if (UI.mainMenuIndex < localization.menuText.length - 1)
            UI.mainMenuIndex++;
          break;
        case 2:
          if (
            UI.languageMenuIndex <
            localization.availableLanguagesText.length - 1
          )
            UI.languageMenuIndex++;
          break;
        case 99:
          if (UI.gameOverMenuIndex < localization.gameOverText.length - 1)
            UI.gameOverMenuIndex++;
          break;
      }
    }
    if (e.keyCode == KEYS.Enter) {
      switch (UI.panelUIIndex) {
        case 0:
          mainMenuPanel.select();
          break;
        case 1:
          highScoreMenu.select();
          break;
        case 3:
          languageMenu.select();
          break;
        case 4:
          controlsMenuPanel.select();
          break;
        case 99:
          gameOverPanel.select();
          break;
      }
    }
  }
});
window.addEventListener("keyup", (e) => {
  keyState[e.keyCode] = false;
});
//#endregion

//#region  Input
function shoot() {
  if (delayShoot === 0) {
    Bullets.push(
      new Bullet({
        velX: 15,
        x: player.x + player.w / 2,
        y:
          player.y / gameManager.getScale() +
          (player.h * gameManager.getScale()) / 2,
      })
    );
    delayShoot = 100;
  }
}

function inputGame() {
  if (keyState[KEYS.W]) {
    player.y -= player.speed;
  }
  if (keyState[KEYS.S]) {
    player.y += player.speed;
  }
  if (keyState[KEYS.Spacebar]) {
    shoot();
  }
}

//#endregion
function collisionCheck(a, b) {
  return (
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
  );
}

function collisionUpdate() {
  Bullets.forEach(function (bullet) {
    Enemies.forEach(function (enemy) {
      if (collisionCheck(bullet, enemy)) {
        bullet.destroy();
        enemy.destroy();
      }
    });
  });

  Enemies.forEach(function (enemy) {
    if (collisionCheck(enemy, player)) {
      enemy.destroy();
      player.damage();
    }
  });
}

//#region UPDATE
const update = () => {
  context.clearRect(0, 0, gameManager.width, gameManager.height);
  inputGame();
  gameManager.area(player);

  if (Math.random() < 0.1) Particles.push(new Particle());

  Particles.forEach(function (particle) {
    particle.update();
  });

  Particles = Particles.filter(function (particle) {
    return particle.active;
  });

  Particles.forEach(function (particle) {
    particle.draw(context);
  });

  if (Game.isPlay === true && Game.isGameOver === false) {
    Bullets.forEach(function (bullet) {
      bullet.update();
    });

    Bullets = Bullets.filter(function (bullet) {
      return bullet.active;
    });

    Bullets.forEach(function (bullet) {
      bullet.draw(context);
    });

    if (delayShoot > 0) {
      delayShoot -= 10;
    }

    let positionY = Math.floor(Math.random() * gameManager.height - 200) + 200;

    if (Math.random() < 0.02) {
      Enemies.push(new EnemyEasy(gameManager.width, positionY));
    }

    if (Math.random() < 0.005) {
      Enemies.push(new EnemyAverage(gameManager.width, positionY));
    }

    if (Math.random() < 0.001) {
      Enemies.push(new EnemyHigh(gameManager.width, positionY));
    }

    Enemies.forEach(function (enemy) {
      if (enemy.x < 0) {
        enemy.destroy();
      }
      enemy.draw(context);
      enemy.move();
    });

    Enemies = Enemies.filter(function (enemy) {
      return enemy.active;
    });

    player.draw(context);

    collisionUpdate();
    hud.draw(context, player);
    Game.score += 1;

    if (player.health <= 0) {
      Game.isGameOver = true;
    }
  } else if (Game.isGameOver) {
    if (localStorage.getItem("score") === null) {
      localStorage.setItem("score", Game.score);
      Game.myBestScore = Game.score;
    }
    if (parseInt(localStorage.getItem("score")) <= Game.score) {
      localStorage.setItem("score", Game.score);
      Game.myBestScore = Game.score;
    }
    UI.panelUIIndex = 99;
    gameOverPanel.draw();
    Bullets = [];
    Enemies = [];
    player.health = 3;
  } else if (!Game.isPlay) {
    switch (UI.panelUIIndex) {
      case 0:
        mainMenuPanel.draw();
        break;
      case 1:
        highScoreMenu.draw();
        break;
      case 2:
        languageMenu.draw();
        break;
      case 3:
        controlsMenuPanel.draw();
        break;
    }

    new DebugMessage({
      x: gameManager.width - 15,
      y: 30,
      text: localization.dev,
      align: "right",
    }).draw(context);

    new DebugMessage({
      x: gameManager.width - 15,
      y: gameManager.height - 15,
      text: localization.version,
      align: "right",
    }).draw(context);

    new DebugMessage({
      x: 15,
      y: gameManager.height - 50,
      text: localization.navigation,
      align: "left",
    }).draw(context);

    new DebugMessage({
      x: 15,
      y: gameManager.height - 15,
      text: localization.confirm,
      align: "left",
    }).draw(context);
  }

  requestAnimationFrame(update);
};

update();

//#endregion
