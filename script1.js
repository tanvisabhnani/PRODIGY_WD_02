let startTime;
let elapsedTime = 0;
let timerInterval;

function startPause() {
    if (!startTime) {
        // Start the stopwatch
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        document.getElementById("startPause").textContent = "Pause";
    } else {
        // Pause the stopwatch
        clearInterval(timerInterval);
        startTime = null;
        document.getElementById("startPause").textContent = "Resume";
    }
}

function lapReset() {
    if (startTime) {
        // Record lap time
        let lapTime = Date.now() - startTime - elapsedTime;
        elapsedTime += lapTime;

        // Display lap time
        let li = document.createElement("li");
        li.textContent = formatTime(elapsedTime);
        document.getElementById("laps").appendChild(li);
    } else {
        // Reset the stopwatch
        clearInterval(timerInterval);
        startTime = null;
        elapsedTime = 0;
        document.getElementById("display").textContent = "00:00:00";
        document.getElementById("laps").innerHTML = "";
        document.getElementById("startPause").textContent = "Start";
    }
}

function updateTime() {
    let currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    document.getElementById("display").textContent = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let hundredths = Math.floor((milliseconds % 1000) / 10);
    
    return `${pad2(minutes)}:${pad2(seconds)}:${pad2(hundredths)}`;
}

function pad2(number) {
    return (number < 10 ? '0' : '') + number;
}

document.getElementById("startPause").addEventListener("click", startPause);
document.getElementById("lapReset").addEventListener("click", lapReset);
