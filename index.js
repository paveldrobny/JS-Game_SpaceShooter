import GameManager from "./gameManager.js";
import Player from "./objects/player.js";
import KEYS from "./keys.js";
import EnemyEasy from "./objects/enemyEasy.js";
import EnemyAverage from "./objects/enemyAverage.js";
import EnemyHigh from "./objects/enemyHigh.js";

//#region INIT
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const gameManager = new GameManager();
const player = new Player(
  75 * gameManager.getScale(),
  (gameManager.height / 2) * gameManager.getScale(),
  "green"
);

let playerData = {
  x: 0,
  y: 0,
  w: 0,
};

let delayShoot = 0;
let Bullets = [];
let Enemies = [];
let Particles = [];
let isPlay = false;

let canvasWidth = gameManager.width;
let canvasHeight = gameManager.height;

let panelUIIndex = 0;
let mainMenuIndex = 0;
let controlsMenuIndex = 0;

function openPanelById(index) {
  panelUIIndex = index;
}

function mainMenuSelect() {
  switch (mainMenuIndex) {
    case 0:
      isPlay = true;
      break;
    case 2:
      panelUIIndex = 1;
      break;
  }
}

function controlsMenuSelect() {
  switch (controlsMenuIndex) {
    case 0:
      panelUIIndex = 0;
      break;
  }
}

//#endregion

//#region EVENTS
window.addEventListener("load", function () {
  gameManager.resize(canvas, context, canvasWidth, canvasHeight);
});

function drawCanvasMessage(align, text, x, y) {
  context.font = `20px sans-serif`;
  context.fillStyle = "gray";
  context.textAlign = align;
  context.fillText(text, x, y);
}

window.addEventListener("resize", function () {
  gameManager.resize(canvas, context, canvasWidth, canvasHeight);
});

window.addEventListener("keydown", function (e) {
  keyState[event.keyCode] = true;

  if (!isPlay) {
    if (e.keyCode == KEYS.W || e.keyCode == KEYS.ArrowUp) {
      switch (panelUIIndex) {
        case 0:
          if (mainMenuIndex > 0) mainMenuIndex--;
          break;
        case 1:
          if (controlsMenuIndex > 0) controlsMenuIndex--;
          break;
      }
    }
    if (e.keyCode == KEYS.S || e.keyCode == KEYS.ArrowDown) {
      switch (panelUIIndex) {
        case 0:
          if (mainMenuIndex < menuText.length - 1) mainMenuIndex++;
          break;
      }
    }
    if (e.keyCode == KEYS.Enter) {
      switch (panelUIIndex) {
        case 0:
          mainMenuSelect();
          break;
        case 1:
          controlsMenuSelect();
          break;
      }
    }
  }
});
window.addEventListener("keyup", onKeyUp);
//#endregion

//#region  INPUT
let keyState = [];

function onKeyDown(event) {
  keyState[event.keyCode] = true;
}

function onKeyUp(event) {
  keyState[event.keyCode] = false;
}

function shoot() {
  if (delayShoot === 0) {
    Bullets.push(
      new Bullet({
        velX: 15,
        x: playerData.x + playerData.w + 50,
        y: playerData.y,
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
const backText = "Back to menu";
const acceptText = "Enter";
const menuText = ["Play", "High score (soon)", "Controls"];

const UIButton = {
  space: 70,
  fontWeight: {
    normal: "normal",
    active: "bold",
  },
  color: {
    normal: "white",
    active: "red",
  },
  dot: {
    space: 30,
    radius: 5,
  },
};

function drawCircle(i, x) {
  context.beginPath();
  context.arc(
    x,
    gameManager.height / 2 + i * UIButton.space - UIButton.space * 1.5 - 15,
    UIButton.dot.radius,
    0,
    2 * Math.PI,
    false
  );
  context.fillStyle = UIButton.color.active;
  context.fill();
}

function drawUIMenu() {
  for (let i = 0; i < menuText.length; i++) {
    context.font = `${
      mainMenuIndex == i
        ? UIButton.fontWeight.active
        : UIButton.fontWeight.normal
    } 45px sans-serif`;
    context.fillStyle =
      mainMenuIndex == i ? UIButton.color.active : UIButton.color.normal;
    context.textAlign = "center";
    context.fillText(
      menuText[i],
      gameManager.width / 2,
      gameManager.height / 2 + i * UIButton.space - UIButton.space * 1.5
    );

    console.log(i * UIButton.space);

    if (mainMenuIndex == i) {
      drawCircle(
        i,
        gameManager.width / 2 -
          context.measureText(menuText[i]).width / 2 -
          UIButton.dot.space
      );
      drawCircle(
        i,
        gameManager.width / 2 +
          context.measureText(menuText[i]).width / 2 +
          UIButton.dot.space
      );
    }
  }
}

const keyboardInputText = ["- Keyboard -", "Move - W,S", "Shoot - Spacebar"];

const gamepadInputText = ["- Gamepad (soon) -", "Move - ...", "Shoot - ..."];
function drawUIConrols() {
  for (let i = 0; i < keyboardInputText.length; i++) {
    context.font = `${
      i == 0
        ? UIButton.fontWeight.active + " 35px"
        : UIButton.fontWeight.normal + " 28px"
    } sans-serif`;
    context.fillStyle = UIButton.color.normal;
    context.textAlign = "right";
    context.fillText(
      keyboardInputText[i],
      gameManager.width / 2 - 80,
      gameManager.height / 2 + (i * UIButton.space) / 1.5 - UIButton.space * 2
    );
  }
  for (let i = 0; i < gamepadInputText.length; i++) {
    context.font = `${
      i == 0
        ? UIButton.fontWeight.active + " 35px"
        : UIButton.fontWeight.normal + " 28px"
    } sans-serif`;
    context.fillStyle = UIButton.color.normal;
    context.textAlign = "left";
    context.fillText(
      gamepadInputText[i],
      gameManager.width / 2 + 80,
      gameManager.height / 2 + (i * UIButton.space) / 1.5 - UIButton.space * 2
    );
  }

  context.font = `${UIButton.fontWeight.active} 45px sans-serif`;
  context.fillStyle = UIButton.color.active;
  context.textAlign = "center";
  context.fillText(
    backText,
    gameManager.width / 2,
    gameManager.height / 2 + 4 * UIButton.space - UIButton.space * 1.5
  );

  drawCircle(
    4,
    gameManager.width / 2 -
      context.measureText(backText).width / 2 -
      UIButton.dot.space
  );

  drawCircle(
    4,
    gameManager.width / 2 +
      context.measureText(backText).width / 2 +
      UIButton.dot.space
  );
}

const bestScoreTitleText = ["BEST SCORE"];
function drawUIHighScore() {
  context.font = `${UIButton.fontWeight.active} 31px sans-serif`;
  context.fillStyle = UIButton.color.normal;
  context.textAlign = "center";
  context.fillText(
    bestScoreTitleText,
    gameManager.width / 2,
    gameManager.height / 2 + (0 * UIButton.space) / 1.5 - UIButton.space * 2
  );

  context.font = `${UIButton.fontWeight.normal} 30px sans-serif`;
  context.fillStyle = UIButton.color.normal;
  context.textAlign = "center";
  context.fillText(
    "{YOUR SCORE}",
    gameManager.width / 2,
    gameManager.height / 2 + (2 * UIButton.space) / 1.5 - UIButton.space * 2
  );

  context.font = `${UIButton.fontWeight.active} 45px sans-serif`;
  context.fillStyle = UIButton.color.active;
  context.textAlign = "center";
  context.fillText(
    backText,
    gameManager.width / 2,
    gameManager.height / 2 + 4 * UIButton.space - UIButton.space * 1.5
  );

  drawCircle(
    4,
    gameManager.width / 2 -
      context.measureText(backText).width / 2 -
      UIButton.dot.space
  );

  drawCircle(
    4,
    gameManager.width / 2 +
      context.measureText(backText).width / 2 +
      UIButton.dot.space
  );
}

const safeZone = 10 * gameManager.getScale();
let healthBarWidth = gameManager.width - safeZone * 2;
let score = 0;

function drawHUD() {
  // draw health bar
  context.fillStyle = "rgba(0,0,0,.15)";
  context.fillRect(safeZone, safeZone, healthBarWidth, 10);
  context.fillStyle =
    player.health <= 33.33 ? "rgb(215,50,50)" : "rgb(5,90,10)";
  context.fillRect(
    safeZone,
    safeZone,
    (player.health * healthBarWidth) / 100,
    10
  );

  // draw score
  context.font = "30px sans-serif";
  context.fillStyle = UIButton.color.normal;
  context.textAlign = "left";
  context.fillText(score, safeZone, gameManager.height - safeZone);
}

function Bullet(bullet) {
  this.active = true;
  this.color = "rgba(255,0,0,0.8)";
  this.xVel = -bullet.velX;
  this.w = 15;
  this.h = 5;
  this.x = bullet.x;
  this.y = bullet.y;
}

Bullet.prototype.inBounds = function () {
  return (
    this.x >= 0 &&
    this.x <= canvasWidth &&
    this.y >= 0 &&
    this.y <= canvasHeight
  );
};

Bullet.prototype.draw = function () {
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, this.w, this.h);
};

Bullet.prototype.update = function () {
  this.x -= this.xVel;
  this.active = this.inBounds() && this.active;
};

Bullet.prototype.die = function () {
  this.active = false;
};

function Particle() {
  this.x = canvasWidth;
  this.y = Math.random() * canvasHeight;
  this.xVel = 4;
  this.yVel = 0;
  this.w = 4 * gameManager.getScale();
  this.h = 4 * gameManager.getScale();
  this.color = "rgba(255,255,255,0.5";
  this.active = true;
}

Particle.prototype.inBounds = function () {
  return (
    this.x >= 0 &&
    this.x <= canvasWidth &&
    this.y >= 0 &&
    this.y <= canvasHeight
  );
};

Particle.prototype.draw = function () {
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, this.w, this.h);
  this.active = this.active && this.inBounds();
};

Particle.prototype.update = function () {
  this.x -= this.xVel;
};

function collisionCheck(a, b) {
  return (
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
  );
}

function collisionUpdate() {
  Bullets.forEach(function (bullet) {
    Enemies.forEach(function (enemy) {
      if (collisionCheck(bullet, enemy)) {
        bullet.die();
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
  context.clearRect(0, 0, canvasWidth, canvasHeight);

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
    particle.draw();
  });

  if (isPlay == true) {
    Bullets.forEach(function (bullet) {
      bullet.update();
    });

    Bullets = Bullets.filter(function (bullet) {
      return bullet.active;
    });

    Bullets.forEach(function (bullet) {
      bullet.draw();
    });

    if (delayShoot > 0) {
      delayShoot -= 10;
    }

    let positionY = Math.floor(Math.random() * gameManager.height - 200) + 200;

    if (Math.random() < 0.02) {
      Enemies.push(new EnemyEasy(gameManager.width, positionY, "1"));
    }

    if (Math.random() < 0.005) {
      Enemies.push(new EnemyAverage(gameManager.width, positionY, "3"));
    }

    if (Math.random() < 0.001) {
      Enemies.push(new EnemyHigh(gameManager.width, positionY, "3"));
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
    playerData.x = player.x;
    playerData.y = player.y;
    playerData.w = player.w;

    collisionUpdate();
    drawHUD();
    score += 1;

    if (player.health <= 0) {
      isPlay = false;
      if (
        confirm(`[TEMPORARY UI]\n\nYOU LOSE!\nScore: ${score}\nRestart?`) ==
        true
      ) {
        window.location.reload();
      }
    }
  } else {
    switch (panelUIIndex) {
      case 0:
        drawUIMenu();
        break;
      case 1:
        drawUIConrols();
        break;
    }

    drawCanvasMessage(
      "right",
      "Developed by Pavel Drobny",
      canvasWidth - 15,
      30
    );
    drawCanvasMessage(
      "right",
      "v0.3.5 (BETA)",
      canvasWidth - 15,
      canvasHeight - 15
    );
    drawCanvasMessage(
      "left",
      "W,S or Arrows - Navigation",
      15,
      canvasHeight - 50
    );
    drawCanvasMessage("left", "ENTER - Confirm", 15, canvasHeight - 15);
  }

  requestAnimationFrame(update);
};

update();
//#endregion
