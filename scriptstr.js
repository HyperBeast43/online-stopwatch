var fullscreen = false;
var timer;
var running = true;

var hours = 0;
var minutes = 0;
var seconds = 0;
//var diff = 100;

function DrawTime() {
    document.getElementById("hour").innerText = `${hours}h`;
    document.getElementById("minute").innerText = `${minutes}m`;
    document.getElementById("second").innerText = `${seconds}s`;
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

async function StartTimer() {
    timer = setInterval(function () {
        if (running == true) { seconds += 1 ; }
        if (seconds >= 60) { seconds -= 60; minutes++; }
        if (minutes >= 60) { minutes -= 60; hours++; }
        DrawTime();
    }, 1000);
}
