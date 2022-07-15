var fullscreen = false;
var timer;
var running = true;

var days = 0;
var hours = 0;
var minutes = 0;
var seconds = 0;
//var diff = 100;

document.onkeydown = (e) => {
    if (e.key === "s" || e.keyCode == 32) { ToggleTimer(); }
    else if (e.key === "r") { ClearTimer(); }
    else if (e.key === "f") { ToggleFullscreen(); }
}

function DrawTime() {
    document.getElementById("day").innerText = `${days}d`;
    document.getElementById("hour").innerText = `${hours}h`;
    document.getElementById("minute").innerText = `${minutes}m`;
    document.getElementById("second").innerText = `${seconds}s`;
//    document.getElementById("second").innerText = `${seconds.toFixed(1)}s`;
    document.getElementById("debug").innerText = `${Math.random().toFixed(5)}, ${diff}, ${running.toString()}, ${seconds}`;
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
    //pre = Date.now() ;
    //setInterval(() => {
    //diff = Date.now() - pre ;
    //}, 100);
    //if (running == true) { seconds += (diff/1000) ; }
    timer = setInterval(function () {
        if (running == true) { seconds += 1 ; }
        if (seconds >= 60) { seconds -= 60; minutes++; }
        if (minutes >= 60) { minutes -= 60; hours++; }
        if (hours >= 24) { hours -= 24; days++; }
        DrawTime();
    }, 1000);
    document.getElementById("start-btn").innerText = "stop";
}

function StopTimer() {
    clearInterval(timer);
    running = false;
    document.getElementById("start-btn").innerText = "start";
}

function ClearTimer() {
    StopTimer();
    days = 0, hours = 0, minutes = 0, seconds = 0;
    DrawTime();
}
