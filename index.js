import GameManager from "./GameManager.js";
import Player from "./Entities/Player.js";
import EnemyEasy from "./Entities/EnemyEasy.js";
import EnemyAverage from "./Entities/EnemyAverage.js";
import EnemyHigh from "./Entities/EnemyHigh.js";
import MainMenu from "./UI/Panels/MainMenu.js";
import ControlsMenu from "./UI/Panels/ControlsMenu.js";
import { DebugMode, Game, UI } from "./Global.js";
import HUD from "./UI/Panels/HUD.js";
import GameOverMenu from "./UI/Panels/GameOver.js";
import HighScoreMenu from "./UI/Panels/HighScoreMenu.js";
import Bullet from "./Entities/Bullet.js";
import Particle from "./Entities/Particle.js";
import DebugMessage from "./UI/DebugMessage.js";
import l10n from "./l10n/Parse.js";
import LanguageMenu from "./UI/Panels/LanguageMenu.js";
import Buttons from "./Buttons.js";
import { Achievements, achievementsCondition } from "./Achievements.js";
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

let keyState = [];
let delayShoot = 0;
let delaySpawn = 0;
const SPAWN_TIMER = 120;
let Bullets = [];
let Enemies = [];
let Particles = [];

const spawnPoints = [75, 130, 185, 240, 295, 350, 405, 460, 515, 570, 610];


const messageDbgData = [
  {
    x: 30,
    y: 150,
    align: "left",
  },
  {
    x: 45,
    y: 180,
    align: "left",
  },
  {
    x: 45,
    y: 210,
    align: "left",
  },
  {
    x: 45,
    y: 240,
    align: "left",
  },
  {
    x: 45,
    y: 270,
    align: "left",
  },
];

const getDbgText = (i) => {
  switch (i) {
    case 0:
      return `[numpad1] DEBUG MODE: ${DebugMode.isEnabled ? "ON" : "OFF"}`;
    case 1:
      return `- [numpad2] Invincible: ${DebugMode.invincible ? "ON" : "OFF"}`;
    case 2:
      return `- [numpad3] Show collision: ${DebugMode.collision ? "ON" : "OFF"
        }`;
    case 3:
      return `- [numpad4] Show spawn position: ${DebugMode.threeEnemy ? "ON" : "OFF"
        }`;
    case 4:
      return `- [numpad5] Visible out screen: ${DebugMode.offOptimization ? "ON" : "OFF"
        }`;
  }
};

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
        if (UI.mainMenuIndex < l10n.getMenuText().length - 1)
          UI.mainMenuIndex++;
        break;
      case 2:
        if (UI.abilitiesIndex < l10n.abilitiesText().length - 1)
          UI.abilitiesIndex++;
        break;
      case 4:
        if (
          UI.languageMenuIndex <
          l10n.getAvailableLanguagesText().length - 1
        )
          UI.languageMenuIndex++;
        break;
      case 99:
        if (UI.gameOverMenuIndex < l10n.gameOverText().length - 1)
          UI.gameOverMenuIndex++;
        break;
    }
  }
}

function menuAccept(condition) {
  if (condition) {
    switch (UI.panelUIIndex) {
      case 0:
        mainMenuPanel.select(player);
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

  const buttons = new Buttons();
  const btn = buttons.keyboard();

  if (e.keyCode == btn.Dbg) {
    DebugMode.isEnabled = !DebugMode.isEnabled;
  }
  if (e.keyCode == btn.DbgInvncbl) {
    DebugMode.invincible = !DebugMode.invincible;
  }
  if (e.keyCode == btn.DbgCllsn) {
    DebugMode.collision = !DebugMode.collision;
  }
  if (e.keyCode == btn.DbgEnmy) {
    DebugMode.threeEnemy = !DebugMode.threeEnemy;
  }
  if (e.keyCode == btn.DbgOptmztn) {
    DebugMode.offOptimization = !DebugMode.offOptimization;
  }
});

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
          Game.coins += 3;
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

let lastTime = 0;
const fps = 60;
const frameDuration = 1000 / fps;

//#region UPDATE
const update = (timestamp) => {
  if (timestamp - lastTime >= frameDuration) {
    lastTime = timestamp;

    context.clearRect(0, 0, gameManager.width, gameManager.height);

    gameManager.area(player);

    if (DebugMode.isEnabled) {
      for (let i = 0; i < messageDbgData.length; i++) {
        new DebugMessage({
          x: messageDbgData[i].x,
          y: messageDbgData[i].y,
          text: getDbgText(i),
          align: messageDbgData[i].align,
        }).draw(context);
      }
    }

    achievements.UI();

    // DebugMode
    if (DebugMode.isEnabled && DebugMode.threeEnemy) {
      new EnemyAverage(gameManager.width - 260, spawnPoints[0]).draw(context);
      new EnemyHigh(gameManager.width - 110, spawnPoints[1]).draw(context);
      new EnemyEasy(gameManager.width - 410, spawnPoints[2]).draw(context);
      new EnemyAverage(gameManager.width - 260, spawnPoints[3]).draw(context);
      new EnemyHigh(gameManager.width - 110, spawnPoints[4]).draw(context);
      new EnemyEasy(gameManager.width - 410, spawnPoints[5]).draw(context);
      new EnemyAverage(gameManager.width - 260, spawnPoints[6]).draw(context);
      new EnemyHigh(gameManager.width - 110, spawnPoints[7]).draw(context);
      new EnemyEasy(gameManager.width - 410, spawnPoints[8]).draw(context);
      new EnemyAverage(gameManager.width - 260, spawnPoints[9]).draw(context);
      new EnemyHigh(gameManager.width - 110, spawnPoints[10]).draw(context);
    }

    playerMovementPC();

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
        if (bullet.x > gameManager.width) {
          bullet.destroy();
        }
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
      if (delaySpawn === 0) {
        let positionY =
          spawnPoints[(Math.random() * spawnPoints.length).toFixed(0)];
        let random = Math.random() * 10;

        if (random >= 3.1) {
          delaySpawn = SPAWN_TIMER;
          Enemies.push(new EnemyEasy(gameManager.width + 35, positionY));
        }

        if (random >= 1 && random <= 3.0) {
          delaySpawn = SPAWN_TIMER;
          Enemies.push(new EnemyAverage(gameManager.width + 35, positionY));
        }

        if (random < 1) {
          delaySpawn = SPAWN_TIMER;
          Enemies.push(new EnemyHigh(gameManager.width + 35, positionY));
        }
      } else {
        delaySpawn -= 10;
      }

      /////////////////////////////////

      Enemies.forEach(function (enemy) {
        if (enemy.x < -100) {
          if (!DebugMode.isEnabled || !DebugMode.offOptimization) {
            enemy.destroy();
          }
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

      const messageData = [
        { x: gameManager.width - 15, y: 30, text: l10n.dev(), align: "right" },
        {
          x: gameManager.width - 15,
          y: gameManager.height - 15,
          text: l10n.version,
          align: "right",
        },
        {
          x: 15,
          y: gameManager.height - 50,
          text: l10n.navigation(),
          align: "left",
        },
        {
          x: 15,
          y: gameManager.height - 15,
          text: l10n.confirm(),
          align: "left",
        },
      ];

      messageData.forEach((message) => {
        new DebugMessage({
          x: message.x,
          y: message.y,
          text: message.text,
          align: message.align,
        }).draw(context);
      });
    }
  }

  requestAnimationFrame(update);
};

requestAnimationFrame(update);

//#endregion
