// script.js
var audio = new Audio("metronome-tick.mp3");
document.addEventListener("DOMContentLoaded", function() {

    var btnPlus = document.getElementById("btn_plus");
    var btnMinus = document.getElementById("btn_minus");
    var rangeSlider = document.getElementById("rangeSlider");
    var btnPlay = document.getElementById("btn_play");
    var btnPlay2 = document.getElementById("btn_play2");

    btnPlus.addEventListener("click", function() {
        rangeSlider.value = parseInt(rangeSlider.value) + 1;

        updateBPM();
    });

    btnMinus.addEventListener("click",function(){
        rangeSlider.value = parseInt(rangeSlider.value) - 1;
        updateBPM();
    });

    rangeSlider.addEventListener("input", function() {
        updateBPM();
    });

    function updateBPM() {
        var bpmDisplay = document.getElementById("bpm");
        bpmDisplay.textContent = parseInt(rangeSlider.value) + 40;
    }

    btnPlay.addEventListener("click", function() {
        console.log(btnPlay.innerHTML);
        if (btnPlay.innerHTML === "&#9654") {
            btnPlay.innerHTML = "&#9646;&#9646;";
            playMetronomeTick();
        } else {
            btnPlay.innerHTML = "&#9654;";
            stopMetronomeTick();
        }
    });

    function playMetronomeTick() {
        var bpm = parseInt(rangeSlider.value) + 40;
        var delay = 60000 / bpm; // Convert BPM to milliseconds per beat
        audio.loop = true;
        audio.play();
        setTimeout(function() {
            stopMetronomeTick();
        }, delay * 4); // Stop after 4 beats (adjust as needed)
    }

    function stopMetronomeTick() {
        audio.pause();
        audio.currentTime = 0;
    }
});
