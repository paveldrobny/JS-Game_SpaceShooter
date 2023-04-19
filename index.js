import GameManager from "./gameManager.js";
import Player from "./Entities/Player.js";
import EnemyEasy from "./Entities/EnemyEasy.js";
import EnemyAverage from "./Entities/EnemyAverage.js";
import EnemyHigh from "./Entities/EnemyHigh.js";
import MainMenu from "./UI/Panels/MainMenu.js";
import ControlsMenu from "./UI/Panels/ControlsMenu.js";
import { DebugMode, Game, UI } from "./global.js";
import HUD from "./UI/Panels/HUD.js";
import GameOverMenu from "./UI/Panels/GameOver.js";
import HighScoreMenu from "./UI/Panels/HighScoreMenu.js";
import Bullet from "./Entities/Bullet.js";
import Particle from "./Entities/Particle.js";
import DebugMessage from "./UI/DebugMessage.js";
import localization from "./Localization/Parse.js";
import LanguageMenu from "./UI/Panels/LanguageMenu.js";
import Buttons from "./buttons.js";
import { Achievements, achievementsCondition } from "./achievements.js";
import AchievementsMenu from "./UI/Panels/AchievementsMenu.js";
import AbilitiesMenu from "./UI/Panels/AbilitiesMenu.js";

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
const abilitiesMenu = new AbilitiesMenu();
const achievementsMenu = new AchievementsMenu();
const languageMenu = new LanguageMenu();
const controlsMenuPanel = new ControlsMenu();
const hud = new HUD();
const gameOverPanel = new GameOverMenu();
const achievements = new Achievements();

let isGamepadConnected = false;
let keyState = [];
let delayShoot = 0;
let Bullets = [];
let Enemies = [];
let Particles = [];

const ENEMY_EASY_SPAWN_DISTANCE = 20;
const ENEMY_AVARAGE_SPAWN_DISTANCE = 80;
const ENEMY_HIGH_SPAWN_DISTANCE = 140;

let positionLogic = {
  easyX: ENEMY_EASY_SPAWN_DISTANCE,
  averageX: ENEMY_AVARAGE_SPAWN_DISTANCE,
  highX: ENEMY_HIGH_SPAWN_DISTANCE,
};

const messageData = [
  { x: gameManager.width - 15, y: 30, text: localization.dev, align: "right" },
  {
    x: gameManager.width - 15,
    y: gameManager.height - 15,
    text: localization.version,
    align: "right",
  },
  {
    x: 15,
    y: gameManager.height - 50,
    text: localization.navigation,
    align: "left",
  },
  {
    x: 15,
    y: gameManager.height - 15,
    text: localization.confirm,
    align: "left",
  },
];

//#endregion

//#region Events
window.addEventListener("load", function () {
  gameManager.resize(canvas, context, gameManager.width, gameManager.height);
});

window.addEventListener("resize", function () {
  gameManager.resize(canvas, context, gameManager.width, gameManager.height);
});

function menuSelectorUp(condition) {
  if (condition) {
    switch (UI.panelUIIndex) {
      case 0:
        if (UI.mainMenuIndex > 0) UI.mainMenuIndex--;
        break;
      case 2:
        if (UI.abilitiesIndex > 0) UI.abilitiesIndex--;
        break;
      case 4:
        if (UI.languageMenuIndex > 0) UI.languageMenuIndex--;
        break;
      case 99:
        if (UI.gameOverMenuIndex > 0) UI.gameOverMenuIndex--;
        break;
    }
  }
}

function menuSelectorDown(condition) {
  if (condition) {
    switch (UI.panelUIIndex) {
      case 0:
        if (UI.mainMenuIndex < localization.menuText.length - 1)
          UI.mainMenuIndex++;
        break;
      case 2:
        if (UI.abilitiesIndex < localization.abilitiesText.length - 1)
          UI.abilitiesIndex++;
        break;
      case 4:
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
}

function menuAccept(condition) {
  if (condition) {
    switch (UI.panelUIIndex) {
      case 0:
        mainMenuPanel.select();
        break;
      case 1:
        highScoreMenu.select();
        break;
      case 2:
        abilitiesMenu.select();
        break;
      case 3:
        achievementsMenu.select();
        break;
      case 4:
        languageMenu.select();
        break;
      case 5:
        controlsMenuPanel.select();
        break;
      case 99:
        gameOverPanel.select();
        break;
    }
  }
}

window.addEventListener("keydown", (e) => {
  keyState[e.keyCode] = true;

  const buttons = new Buttons();

  if (!Game.isPlay || Game.isGameOver) {
    const btn = buttons.keyboard();
    menuSelectorUp(e.keyCode == btn.W || e.keyCode == btn.ArrowUp);
    menuSelectorDown(e.keyCode == btn.S || e.keyCode == btn.ArrowDown);
    menuAccept(e.keyCode == btn.Enter);
  }
});

window.addEventListener("keyup", (e) => {
  keyState[e.keyCode] = false;
});

window.addEventListener("gamepadconnected", function (e) {
  isGamepadConnected = true;
  console.log("✅ Gamepad connected:", e.gamepad);
  loopGamepad();
});

window.addEventListener("gamepaddisconnected", function (e) {
  isGamepadConnected = false;
});

function loopGamepad() {
  setInterval(function () {
    if (isGamepadConnected) {
      console.log(UI.gamepadValidIndex);
      const buttons = new Buttons();
      if (buttons.gamepad().A == undefined) {
        UI.gamepadValidIndex += 1;
      } else {
        if (!Game.isPlay || Game.isGameOver) {
          const buttons = new Buttons();
          menuSelectorUp(buttons.gamepad().Up);
          menuSelectorDown(buttons.gamepad().Down);
          menuAccept(buttons.gamepad().A.pressed);
        }
      }
    }
  }, 100);
}

//#endregion

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

function playerMovementPC() {
  const button = new Buttons();
  const keyboard = button.keyboard();

  if (keyState[keyboard.W] || keyState[keyboard.ArrowUp]) {
    player.y -= player.speed;
  }
  if (keyState[keyboard.S] || keyState[keyboard.ArrowDown]) {
    player.y += player.speed;
  }
  if (keyState[keyboard.Spacebar]) {
    shoot();
  }
}

function playerMovementGamepad() {
  const button = new Buttons();
  const gamepad = button.gamepad();

  if (gamepad.Up) {
    player.y -= player.speed;
  }
  if (gamepad.Down) {
    player.y += player.speed;
  }
  if (button.gamepad().X != undefined) {
    if (gamepad.X.pressed) {
      shoot();
    }
  }
}

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
        enemy.damage();
        if (enemy.health <= 0) {
          achievementsCondition.Count.kill++;
          enemy.destroy();
          Game.coins += 10;
          localStorage.setItem("coins", Game.coins);
        }
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

  gameManager.area(player);
  achievements.UI();

  // DebugMode
  if (DebugMode.isEnabled) {
    new Enemy(100, 100, 0).draw(context);
    new Enemy(300, 100, 1).draw(context);
    new Enemy(500, 100, 2).draw(context);
  }

  playerMovementPC();
  if (isGamepadConnected) {
    playerMovementGamepad();
  }

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

    // SPAWN SYSTEM
    let positionY = Math.floor(Math.random() * (gameManager.height - 150)) + 50;

    positionLogic.easyX -= 1;
    positionLogic.averageX -= 1;
    positionLogic.highX -= 1;

    if (
      positionLogic.easyX !== positionLogic.averageX &&
      positionLogic.easyX !== positionLogic.highX
    ) {
      if (positionLogic.easyX <= 0) {
        Enemies.push(new EnemyEasy(gameManager.width, positionY));
        positionLogic.easyX = ENEMY_EASY_SPAWN_DISTANCE;
      }
    }

    if (positionLogic.averageX <= 0) {
      Enemies.push(new EnemyAverage(gameManager.width, positionY));
      positionLogic.averageX = ENEMY_AVARAGE_SPAWN_DISTANCE;
    }

    if (positionLogic.highX <= 0) {
      Enemies.push(new EnemyHigh(gameManager.width, positionY));
      positionLogic.highX = ENEMY_HIGH_SPAWN_DISTANCE;
    }
    ///////////////////////////////////

    Enemies.forEach(function (enemy) {
      if (enemy.x < -100) {
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

    achievements.checkReach();
    achievements.checkKill();

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

    if (localStorage.getItem("health") !== null) {
      player.health = parseInt(localStorage.getItem("health"));
    } else {
      player.health = 3;
    }

    achievementsCondition.Count.reach = 0;
  } else if (!Game.isPlay) {
    switch (UI.panelUIIndex) {
      case 0:
        mainMenuPanel.draw();
        break;
      case 1:
        highScoreMenu.draw();
        break;
      case 2:
        abilitiesMenu.draw();
        break;
      case 3:
        achievementsMenu.draw();
        break;
      case 4:
        languageMenu.draw();
        break;
      case 5:
        controlsMenuPanel.draw();
        break;
    }

    if (!DebugMode.isEnabled) {
      messageData.forEach((message) => {
        new DebugMessage({
          x: message.x,
          y: message.y,
          text: message.text,
          align: message.align,
        }).draw(context);
      });
    }

    const buttonsGamepad = new Buttons();
    new DebugMessage({
      x: gameManager.width / 2,
      y: gameManager.height - 35,
      text: isGamepadConnected
        ? `Gamepad connected: ${buttonsGamepad.myGamepad.id
            .replace(/ /g, "")
            .slice(0, 20)}...`
        : "Gamepad not found",
      align: "center",
      color: isGamepadConnected ? "green" : "red",
    }).draw(context);
  }

  requestAnimationFrame(update);
};

update();

//#endregion
