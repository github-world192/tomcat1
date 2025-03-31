let rows = 13;
let cols = 13;
let gridSize, cellSize, marginX, marginY;
let players = [];
let currentPlayer = 0;
let diceRoll = 1;
let rolling = false;
let rollStartTime = 0;
let rollDuration = 1000;
let path = [];
let moving = false;
let moveSteps = 0;
let moveIndex = 0;
let stepDuration = 200;
let bgm;
let bgmStarted = false;
let bgImg;

function preload() {
  bgm = loadSound('../sound_effects/game_bgm.mp3');
  bgImg = loadImage('../images/background.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  stroke(0);
  
  gridSize = min(width, height) * 0.8;
  cellSize = gridSize / max(rows, cols);
  
  marginX = (width - gridSize) / 2;
  marginY = (height - gridSize) / 2;
  
  calculatePath();
  
  for (let i = 0; i < 4; i++) {
    players.push({
      index: 0,
      color: color(random(100, 255), random(100, 255), random(100, 255))
    });
  }
  
  bgm.loop();
}

function draw() {
  background(255);
  image(bgImg, 0, 0, width, height);
  tint(255, 120);

  // 畫格子
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = marginX + i * cellSize;
      let y = marginY + j * cellSize;

      if (i == 0 || i == rows - 1 || j == 0 || j == cols - 1) {
        fill(0, 0, 0, 255);
        rect(x, y, cellSize, cellSize);
      }

      // 修改顯示條件：只要不是在骰骰子，就顯示當前玩家位置
      if (!rolling) {
        let currentPlayerPos = path[players[currentPlayer].index];
        if (abs(x - currentPlayerPos.x) < 1 && abs(y - currentPlayerPos.y) < 1) {
          fill(255, 0, 0, 150);
          rect(currentPlayerPos.x, currentPlayerPos.y, cellSize, cellSize);
        }
      }
    }
  }

  // 畫玩家
  for (let i = 0; i < players.length; i++) {
    let { index, color } = players[i];
    let pos = path[index];
    
    fill(color);
    ellipse(pos.x, pos.y, cellSize * 0.6);
  }

  // 移動邏輯
  if (moving) {
    let player = players[currentPlayer];
    
    if (millis() - player.moveStartTime >= stepDuration) {
      moveIndex = (moveIndex + 1) % path.length;
      player.index = moveIndex;
      player.moveStartTime = millis();
      moveSteps--;
      if (moveSteps <= 0) {
        moving = false;
        currentPlayer = (currentPlayer + 1) % players.length;
      }
    }
  }

  // 顯示當前玩家回合
  fill(0);
  textSize(windowWidth * 0.05);
  textAlign(LEFT, TOP);
  text(`Now it's player ${currentPlayer + 1}'s turn`, 20, 20);
  
  let currentPlayerColor = players[currentPlayer].color;
  fill(currentPlayerColor);
  noStroke();
  ellipse(width / 2, 50, 30, 30);
  
  // 顯示骰子動畫
  if (rolling) {
    let elapsed = millis() - rollStartTime;
    if (elapsed < rollDuration) {
      diceRoll = floor(random(1, 7));
    } else {
      rolling = false;
    }
  }
  
  drawDice(width / 2, height / 2, diceRoll);
}

function calculatePath() {
  for (let i = 0; i < cols; i++) path.push({ x: marginX + i * cellSize, y: marginY });
  for (let i = 1; i < rows; i++) path.push({ x: marginX + (cols - 1) * cellSize, y: marginY + i * cellSize });
  for (let i = cols - 2; i >= 0; i--) path.push({ x: marginX + i * cellSize, y: marginY + (rows - 1) * cellSize });
  for (let i = rows - 2; i > 0; i--) path.push({ x: marginX, y: marginY + i * cellSize });
}

function drawDice(x, y, number) {
  fill(255);
  stroke(0);
  strokeWeight(4);
  rectMode(CENTER);
  rect(x, y, 80, 80, 10);
  
  fill(0);
  noStroke();
  textSize(32);
  textAlign(CENTER, CENTER);
  text(number, x, y);
}

function mousePressed() {
  if (!rolling && !moving) {
    rolling = true;
    rollStartTime = millis();
    
    setTimeout(() => {
      let finalRoll = floor(random(1, 7));
      diceRoll = finalRoll;
      moveSteps = finalRoll;
      moveIndex = players[currentPlayer].index;
      moving = true;
      players[currentPlayer].moveStartTime = millis();
    }, rollDuration);
  }

  if (!bgmStarted) {
    userStartAudio();
    bgm.loop();
    bgmStarted = true;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  gridSize = min(width, height) * 0.8;
  cellSize = gridSize / max(rows, cols);
  marginX = (width - gridSize) / 2;
  marginY = (height - gridSize) / 2;
}