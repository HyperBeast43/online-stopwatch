var fullscreen = false;
var timer;
var running = true;

var days = 0;
var hours = 0;
var minutes = 0;
var seconds = 0;
var milliseconds = 0;

StartTimer();

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
    document.getElementById("millisecond").innerText = `${milliseconds}ms`;
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

function StartTimer() {
    timer = setInterval(function () {
        milliseconds += 50 ;
        if (milliseconds == 1000) { milliseconds = 0; seconds++; }
        if (seconds == 60) { seconds = 0; minutes++; }
        if (minutes == 60) { minutes = 0; hours++; }
        if (hours == 24) { hours = 0; days++; }

        DrawTime();

    }, 50);
    document.getElementById("start-btn").innerText = "stop";
}

function StopTimer() {
    clearInterval(timer);
    document.getElementById("start-btn").innerText = "start";
}

function ClearTimer() {
    StopTimer();
    days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
    DrawTime();
}
