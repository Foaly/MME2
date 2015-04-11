var videoplayer;

window.onload = function() {
    videoplayer = document.getElementById("videoplayer");
    
    document.getElementById("playPauseButton").addEventListener("click", playpauseCallback);
    document.getElementById("stopButton").addEventListener("click", stopCallback);
    document.getElementById("fullscreenButton").addEventListener("click", fullscreenCallback);
    videoplayer.addEventListener("timeupdate", videoPlaybackCallback);
    
    var progressBar = document.getElementById("progressBar");
    progressBar.max = videoplayer.duration;
    progressBar.addEventListener("input", progressBarCallback);
}

var playpauseCallback = function() {
    if(videoplayer.paused) {
        videoplayer.play();
        document.getElementById("playPauseButton").textContent = "\u258D \u258D Pause";
    }
    else {
        videoplayer.pause();
        document.getElementById("playPauseButton").textContent = "\u25B6 Play";
    }
}

var stopCallback = function() {
    videoplayer.pause();
    document.getElementById("playPauseButton").textContent = "\u25B6 Play";
    videoplayer.currentTime = 0;
}

var fullscreenCallback = function() {
    if (videoplayer.requestFullscreen) {
      videoplayer.requestFullscreen();
    } else if (videoplayer.msRequestFullscreen) {
      videoplayer.msRequestFullscreen();
    } else if (videoplayer.mozRequestFullScreen) {
      videoplayer.mozRequestFullScreen();
    } else if (videoplayer.webkitRequestFullscreen) {
      videoplayer.webkitRequestFullscreen();
    }
}

    
var videoPlaybackCallback = function() {
    // convert seconds into string with the format HH:MM:SS:MSMS
    var currentTime = document.getElementById("videoplayer").currentTime.toPrecision(2);
    var numberOfSeconds = parseInt(currentTime, 10);
    var hours   = Math.floor(numberOfSeconds / 3600);
    var minutes = Math.floor((numberOfSeconds - (hours * 3600)) / 60);
    var seconds = numberOfSeconds - (hours * 3600) - (minutes * 60);
    var milliseconds = Math.ceil(((currentTime < 1.0) ? currentTime : (currentTime % Math.floor(currentTime))) * 100);

    if (hours   < 10) {hours   = "0" + hours;}
    if (minutes < 10) {minutes = "0" + minutes;}
    if (seconds < 10) {seconds = "0" + seconds;}
    if (milliseconds < 10) {milliseconds = "0" + milliseconds;}
    
    var time = hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
    document.getElementById("timestamp").textContent = time;
    
    // update the progressbar
    document.getElementById("progressBar").value = currentTime;
}

var progressBarCallback = function() {
    document.getElementById("videoplayer").currentTime = document.getElementById("progressBar").value;
}
