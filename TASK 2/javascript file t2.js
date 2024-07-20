let stopwatchInterval;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

const displayElement = document.getElementById('display');
const lapsList = document.getElementById('laps');
const startPauseButton = document.getElementById('startPauseButton');
const lapButton = document.getElementById('lapButton');
const resetButton = document.getElementById('resetButton');

function startStopwatch() {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    stopwatchInterval = setInterval(updateStopwatch, 10);

    startPauseButton.textContent = 'Pause';
    lapButton.disabled = false;
}

function pauseStopwatch() {
    isRunning = false;
    clearInterval(stopwatchInterval);

    startPauseButton.textContent = 'Resume';
    lapButton.disabled = true;
}

function updateStopwatch() {
    const now = Date.now();
    elapsedTime = now - startTime;
    displayElapsedTime(elapsedTime);
}

function displayElapsedTime(time) {
    const formattedTime = formatTime(time);
    displayElement.textContent = formattedTime;
}

function formatTime(milliseconds) {
    const date = new Date(milliseconds);
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const centiseconds = Math.floor(date.getMilliseconds() / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${centiseconds}`;
}

function lap() {
    if (isRunning) {
        const lapTime = elapsedTime;
        laps.unshift(lapTime); // Add lap time to the beginning of laps array
        displayLaps();
    }
}

function displayLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lapTime, index) => {
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${index + 1}: ${formatTime(lapTime)}`;
        lapsList.appendChild(lapItem);
    });
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    isRunning = false;
    elapsedTime = 0;
    laps = [];

    displayElapsedTime(elapsedTime);
    displayLaps();

    startPauseButton.textContent = 'Start';
    lapButton.disabled = true;
}

startPauseButton.addEventListener('click', function() {
    if (isRunning) {
        pauseStopwatch();
    } else {
        startStopwatch();
    }
});

lapButton.addEventListener('click', lap);

resetButton.addEventListener('click', resetStopwatch);
