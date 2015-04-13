var videoplayer;

window.onload = function() {
    videoplayer = document.getElementById("videoplayer");
    
    document.getElementById("playPauseButton").addEventListener("click", playpauseCallback);
    document.getElementById("stopButton").addEventListener("click", stopCallback);
    document.getElementById("fullscreenButton").addEventListener("click", fullscreenCallback);
    videoplayer.addEventListener("timeupdate", videoPlaybackCallback);
    document.getElementById("filterinput").addEventListener("change", filterCallback);
    
    var progressBar = document.getElementById("progressBar");
    progressBar.max = videoplayer.duration;
    progressBar.addEventListener("input", progressBarCallback);
    
    // hide the controls if we leave fullscreen mode
    document.addEventListener("mozfullscreenchange", function() { if (!document.mozFullScreenElement) { videoplayer.controls = false; } });
    document.addEventListener("MSFullscreenChange", function() { if (!document.msFullscreenElement) { videoplayer.controls = false; } });
    document.addEventListener("webkitExitFullscreen", function() { videoplayer.controls = false; }); // TODO: test this on chrome
}

var playpauseCallback = function() {
    if(videoplayer.paused) {
        videoplayer.play();
        document.getElementById("playPauseButton").textContent = "\u258D \u258D";
    }
    else {
        videoplayer.pause();
        document.getElementById("playPauseButton").textContent = "\u25B6";
    }
}

var stopCallback = function() {
    videoplayer.pause();
    document.getElementById("playPauseButton").textContent = "\u25B6";
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
    
    // show the controls in fullscreen mode
    videoplayer.controls = true;
}

    
var videoPlaybackCallback = function() {
    // convert seconds into string with the format HH:MM:SS:MSMS
    var currentTime = videoplayer.currentTime.toPrecision(2);
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

var filterCallback = function() {
    var filters = "";
    if(document.getElementById("sepiaBox").checked)
        filters += "sepia(100%) ";    
    if(document.getElementById("grayscaleBox").checked)
        filters += "grayscale(100%) ";
    if(document.getElementById("blurBox").checked)
        filters += "blur(3px) ";
    
    videoplayer.style = "filter: " + filters + ";";
}
