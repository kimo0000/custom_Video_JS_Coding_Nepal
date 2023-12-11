const videoEL = document.querySelector("video");
const timerNow = document.querySelector(".timer_now");
const timeLine = document.querySelector(".bar");
const progressBar = document.querySelector(".progress_bar");
const volumeEl = document.querySelector(".volume_btn");
const soundBtn = document.querySelector(".inp .volume");
const inputRangeEl = document.querySelector(".inp input");
const playPauseBtn = document.querySelector(".playing button .play");
const prevNextPlayBtn = document.querySelectorAll(".playing .btn");
const speed = document.querySelector(".screen .speed");
const imgIncursion = document.querySelector(".screen .img_incursion");
const optionsSpeed = document.querySelector(".options_speed");
const fullscreen = document.querySelector(".screen .full_screen");
const startVideos = document.querySelector(".start_timer");
const endVideos = document.querySelector(".end_timer");

window.addEventListener("load", () => {
  endVideos.innerHTML = videoEL.duration;
});

const formatTime = (time) => {
  let sec = Math.floor(time % 60);
  let min = Math.floor(time / 60) % 60;
  let hour = Math.floor(time / 3600);

  sec = sec < 10 ? `0${sec}` : sec;
  min = min < 10 ? `0${min}` : min;
  hour = hour < 10 ? `0${hour}` : hour;

  console.log(sec, min, hour);

  if (hour == 0) {
    return `${sec}:${min} `;
  }

  return `${hour}:${min}:${sec}`;
};

videoEL.addEventListener("timeupdate", (e) => {
  const { currentTime, duration } = e.target;
  let percent = (currentTime / duration) * 100;
  progressBar.style.width = `${percent}%`;
  startVideos.innerHTML = formatTime(videoEL.currentTime);
  timerNow.innerHTML = formatTime(videoEL.currentTime);
});

timeLine.addEventListener("click", (e) => {
  let timeLineWidth = timeLine.clientWidth;
  videoEL.currentTime = (e.offsetX / timeLineWidth) * videoEL.duration;
});

timeLine.addEventListener("mousedown", (e) => {
  timeLine.addEventListener("mousemove", () => {
    console.log(e.offsetX);
    progressBar.style.left = `${e.offsetX}px`;
    timerNow.style.left = `${e.offsetX}px`;
  });
});

soundBtn.addEventListener("click", () => {
  volumeEl.classList.toggle("change");
  if (volumeEl.classList.contains("change")) {
    videoEL.volume = 0.5;
    inputRangeEl.value = 0;
    soundBtn.className = "fa-solid fa-volume-xmark volume";
  } else {
    videoEL.volume = 0.0;
    soundBtn.className = "fa-solid fa-volume-low volume";
    inputRangeEl.value = 0.5;
  }
});

inputRangeEl.addEventListener("input", (e) => {
  videoEL.volume = e.target.value;
  inputRangeEl.value == 0
    ? (soundBtn.className = "fa-solid fa-volume-xmark volume")
    : (soundBtn.className = "fa-solid fa-volume-low volume");
});

playPauseBtn.addEventListener("click", () => {
  videoEL.paused ? videoEL.play() : videoEL.pause();
  if (videoEL.paused) {
    playPauseBtn.className = "fa-solid fa-play play";
  } else {
    playPauseBtn.className = "fa-solid fa-pause play";
  }

  endVideos.innertext = videoEL.duration;
  console.log(videoEL.duration);
});

prevNextPlayBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.id === "back" ? (videoEL.currentTime -= 3) : (videoEL.currentTime += 3);
  });
});

optionsSpeed.querySelectorAll("li").forEach((option) => {
  option.addEventListener("click", (e) => {
    optionsSpeed.querySelector(".active").classList.remove("active");
    option.classList.add("active");
    optionsSpeed.classList.remove("show");
    videoEL.playbackRate = e.target.dataset.speed;
  });
});

speed.addEventListener("click", () => {
  optionsSpeed.classList.toggle("show");
});

document.addEventListener("click", (e) => {
  if (
    e.target.tagName !== "I" ||
    e.target.className !== "fa-regular fa-circle-play speed"
  ) {
    optionsSpeed.classList.remove("show");
  }
});

imgIncursion.addEventListener("click", () => {
  videoEL.requestPictureInPicture();
});

fullscreen.addEventListener("click", () => {
  videoEL.requestFullscreen();
});
