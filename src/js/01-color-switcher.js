const COLOR_INTERVAL = 1000;
let intervalId = null;

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', startSwitch);
refs.stopBtn.addEventListener('click', stopSwitch);

function startSwitch() {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
  
  intervalId = setInterval(() => {
    document.querySelector('body').style.backgroundColor = getRandomHexColor()
  }, COLOR_INTERVAL);
}

function stopSwitch() {
  clearInterval(intervalId);
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
