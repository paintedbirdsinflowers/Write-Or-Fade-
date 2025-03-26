let timerInterval;
let idleTimeout;
let timeLeft;
let wordGoal;
const textarea = document.getElementById('writing-area');
const timerDisplay = document.getElementById('timer');
const wordCountDisplay = document.getElementById('word-count');
const warning = document.getElementById('warning');

function startWriting() {
    
    wordGoal = parseInt(document.getElementById('goal').value);
    timeLeft = parseInt(document.getElementById('time').value);

    
    textarea.value = '';
    textarea.style.opacity = 1;
    warning.style.display = 'none';
    updateWordCount();
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    
    document.getElementById('goal').disabled = true;
    document.getElementById('time').disabled = true;
    document.querySelector('button').disabled = true;

    
    timerInterval = setInterval(updateTimer, 1000);

    
    textarea.addEventListener('input', resetIdleTimer);
    resetIdleTimer();
}

function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
        endSession("Time's up!");
    }
}

function updateWordCount() {
    const text = textarea.value.trim();
    const words = text.length === 0 ? 0 : text.split(/\s+/).length;
    wordCountDisplay.textContent = `Words: ${words} / ${wordGoal}`;

    if (words >= wordGoal) {
        endSession("Goal reached! Great job!");
    }
}

function resetIdleTimer() {
    clearTimeout(idleTimeout);
    textarea.style.opacity = 1;
    warning.style.display = 'none';

    idleTimeout = setTimeout(() => {
        warning.style.display = 'block';
        fadeText();
    }, 3000); // 3 seconds of inactivity triggers warning
}

function fadeText() {
    let opacity = 1;
    const fadeInterval = setInterval(() => {
        opacity -= 0.1;
        textarea.style.opacity = opacity;
        if (opacity <= 0) {
            clearInterval(fadeInterval);
            textarea.value = ''; // Optionally delete text
            updateWordCount();
        }
    }, 200);
}

function endSession(message) {
    clearInterval(timerInterval);
    clearTimeout(idleTimeout);
    alert(message);
    document.getElementById('goal').disabled = false;
    document.getElementById('time').disabled = false;
    document.querySelector('button').disabled = false;
    textarea.removeEventListener('input', resetIdleTimer);
}


textarea.addEventListener('input', updateWordCount);
