let alpha = 0;
let logo;
let fadeSpeed = 3;
let hasJumped = false; // 用來標誌是否已經跳轉過
let introSound; // 宣告一個變數來儲存音效
let soundPlayed = false; // 用來判斷音效是否已播放

function preload() {
  logo = loadImage('../images/logo.jpg'); // 替換為你的 Logo 圖片
  introSound = loadSound('../sound_effects/intro_sound.mp3'); // 加載音效檔案（將 'intro.mp3' 替換為你實際的音效檔案名稱）
}

function setup() {
  // 使用 windowWidth 和 windowHeight 來設置畫布尺寸，這樣可以根據螢幕大小調整
  createCanvas(windowWidth, windowHeight);  
  textAlign(CENTER, CENTER);
  textSize(windowWidth * 0.1); // 根據畫布寬度動態設置字體大小
  
  // 提示用戶與頁面互動
  textSize(24);
  fill(255);
  text("點擊畫面開始", width / 2, height * 0.8);
}

function draw() {
  background(0);

  // 顯示淡入的 Logo，根據畫布大小調整大小
  tint(255, alpha);
  let logoWidth = windowWidth * 0.6; // Logo 寬度佔畫布寬度的 60%
  let logoHeight = logo.height * (logoWidth / logo.width); // 根據比例調整高度
  image(logo, width / 2 - logoWidth / 2, height / 2 - logoHeight / 2, logoWidth, logoHeight);

  // 顯示 "大富翁" 三個字
  fill(255);
  text("天空大富翁(點擊開始)", width / 2, height * 0.2); // 文字顯示在畫面上方，距離上方 20%

  // 如果音效已經播放，開始淡入效果
  if (soundPlayed) {
    if (alpha < 255) {
      alpha += fadeSpeed; // 增加透明度，達到淡入效果
    } else {
      alpha = 255; // 保持透明度最大值
      // 等待 2 秒後跳轉到主遊戲畫面，但只執行一次
      if (!hasJumped) {
        hasJumped = true; // 設置跳轉標誌
        setTimeout(goToMainScreen, 2000); // 等待 2 秒後跳轉
      }
    }
  }
}

// 用戶點擊時播放音效
function mousePressed() {
  if (!introSound.isPlaying()) {
    introSound.play();  // 播放音效
    soundPlayed = true; // 音效已播放，開始淡入動畫
  }
}

// 跳轉到主遊戲畫面
function goToMainScreen() {
  console.log("進入主畫面");
  window.location.href = 'game.html'; // 使用此行進行頁面跳轉
}

// 當瀏覽器大小改變時調整畫布尺寸
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);  // 重新調整畫布大小
  textSize(windowWidth * 0.1); // 根據畫布寬度調整字體大小
}
