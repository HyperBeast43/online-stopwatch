var fullscreen = false;
var timer;
var running = true;

var days = 0;
var hours = 0;
var minutes = 0;
var seconds = 0;
var diff = 100;

const delay = ms => new Promise(res => setTimeout(res, ms));

document.onkeydown = (e) => {
    if (e.key === "s" || e.keyCode == 32) { ToggleTimer(); }
    else if (e.key === "r") { ClearTimer(); }
    else if (e.key === "f") { ToggleFullscreen(); }
}

function DrawTime() {
    document.getElementById("day").innerText = `${days}d`;
    document.getElementById("hour").innerText = `${hours}h`;
    document.getElementById("minute").innerText = `${minutes}m`;
    document.getElementById("second").innerText = `${seconds.toFixed(1)}s`;
    document.getElementById("debug").innerText = `${diff}, ${running.toString()}`;
}

function ToggleFullscreen() {
    var elem = document.documentElement;
    if (!fullscreen) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
        document.getElementById("fullscreen-icon").innerText = "fullscreen_exit";
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
        document.getElementById("fullscreen-icon").innerText = "fullscreen";
    }
    fullscreen = !fullscreen;
}

function ToggleTimer() {
    if (!running) { StartTimer(); }
    else { StopTimer(); }
    running = !running;
}

async function StartTimer() {
    pre = Date.now() ;
    await delay(100);
    diff = Date.now() - pre ;
    if (running == true) { seconds += (diff/1000) ; }
    if (seconds >= 60) { seconds = 0; minutes++; }
    if (minutes == 60) { minutes = 0; hours++; }
    if (hours == 24) { hours = 0; days++; }
    DrawTime();
    document.getElementById("start-btn").innerText = "stop";
}

function StopTimer() {
    running = false;
    document.getElementById("start-btn").innerText = "start";
}

function ClearTimer() {
    StopTimer();
    days = 0, hours = 0, minutes = 0, seconds = 0;
    DrawTime();
}
