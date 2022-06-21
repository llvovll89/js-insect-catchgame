// mobile heigh 처리
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
window.addEventListener("touchend", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

// touch 방지
document.documentElement.addEventListener(
  "touchstart",
  function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  },
  false
);

var lastTouchEnd = 0;

document.documentElement.addEventListener(
  "touchend",
  function (event) {
    var now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  },
  false
);
// DOM 설정
const screens = document.querySelectorAll(".screen");
const choiceBtn = document.querySelectorAll(".choice-btn");
const startBtn = document.getElementById("start-btn");

// container , time , score , message , restart
const container = document.getElementById("container");
const time = document.getElementById("time");
const scorePoint = document.getElementById("score");
const message = document.getElementById("message");
const restart = document.getElementById("restart");

// time , score , insect EL
let seconds = 0;
let score = 0;
let selectInsect = {};

// event
startBtn.addEventListener("click", () => {
  screens[0].classList.add("up");
});

// insec-content btn event
choiceBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img"),
      src = img.getAttribute("src"),
      alt = img.getAttribute("alt");
    selectInsect = { src, alt };
    screens[1].classList.add("up");
    setTimeout(createInsect, 1000);
    timer();
  });
});

const timer = () => {
  setInterval(increaseTime, 1000);
};

function increaseTime() {
  let m = Math.floor(seconds / 60);
  let s = seconds % 30;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  time.innerHTML = `시간 : ${m}:${s}`;
  seconds++;
}

function createInsect() {
  const newInsect = document.createElement("div");
  newInsect.classList.add("insect");
  const { x, y } = getRandomLocation();
  newInsect.style.top = `${y}px`;
  newInsect.style.left = `${x}px`;
  newInsect.innerHTML = `<img src="${selectInsect.src}" 
  alt="${selectInsect.alt}" style="transform: rotate(${
    Math.random() * 360
  }deg)" />`;

  newInsect.addEventListener("click", catchInsect);

  container.appendChild(newInsect);
}

function getRandomLocation() {
  const width = window.innerWidth,
    heihgt = window.innerHeight,
    x = Math.random() * (width - 200) + 100,
    y = Math.random() * (heihgt - 200) + 100;
  return { x, y };
}

function catchInsect() {
  increaseScore();
  this.classList.add("caught");
  setTimeout(() => this.remove(), 2000);
  addInsects();
}

function addInsects() {
  setTimeout(createInsect, 2000);
  // setTimeout(createInsect, 4000);
}

function increaseScore() {
  score++;
  if (score > 29) {
    message.classList.add("visible");
  }
  scorePoint.innerHTML = `Score: ${score}`;
}
