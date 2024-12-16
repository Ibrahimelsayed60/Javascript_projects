'use strict'

const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
const milliSecondsLabel = document.getElementById("milliseconds");

const startButton = document.getElementById("startBtn");
const stopButton = document.getElementById("stopBtn");
const pauseButton = document.getElementById("pauseBtn");
const resetButton = document.getElementById("resetBtn");

const lapList = document.getElementById("laplist");

// Stopwatch variables 

let minutes = 0;
let seconds = 0;
let milliSeconds = 0;

let interval;

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);


function startTimer(){
    interval = setInterval(updateTimer,10);
    startButton.disabled = true;
}


function stopTimer(){
    clearInterval(interval);
    addToLapList();
    resetTimerData();

    startButton.disabled = false;
}

function pauseTimer(){
    clearInterval(interval);
    startButton.disabled = false;
}

function resetTimer(){
    clearInterval(interval);
    resetTimerData();
    // resetButton.disabled = true;
    startButton.disabled = false;
}

function updateTimer(){
    milliSeconds++;
    if(milliSeconds === 1000)
    {
        milliSeconds = 0;
        seconds++;

        if(seconds == 60)
        {
            seconds = 0;
            minutes++;
        }
    }

    displayTimer();
}


function displayTimer(){
    milliSecondsLabel.textContent = padTime(milliSeconds);
    secondsLabel.textContent = padTime(seconds);
    minutesLabel.textContent = padTime(minutes);
}


function padTime(time){
    return time.toString().padStart(2,'0');
}


function resetTimerData(){
    minutes = 0;
    seconds = 0;
    milliSeconds = 0;
    displayTimer();
}

function addToLapList(){
    const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliSeconds)}`;

    const listItem = document.createElement('li');
    listItem.innerHTML = `<span> Lap ${lapList.childElementCount + 1}:  </span> ${lapTime}`;
    lapList.appendChild(listItem);
}
