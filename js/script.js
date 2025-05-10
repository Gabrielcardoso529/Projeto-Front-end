let isWorking = true;
let cycle = 0;
let interval;

function getTimeInSeconds() {
  const focus = parseInt(document.getElementById("inputfocus").value) || 25;
  const shortBreak = parseInt(document.getElementById("inputshortbreak").value) || 5;
  const longBreak = parseInt(document.getElementById("inputlongbreak").value) || 15;

  return {
    focus: focus * 60,
    shortBreak: shortBreak * 60,
    longBreak: longBreak * 60
  };
}

function updateClockColor() {
  const clock = document.querySelector(".clock");
  clock.classList.remove("focus-mode", "short-break-mode", "long-break-mode");

  if (isWorking) {
    clock.classList.add("focus-mode");
    document.getElementById("status").innerText = "Tempo de foco";
  } else if (cycle < 4) {
    clock.classList.add("short-break-mode");
    document.getElementById("status").innerText = "Pausa curta";
  } else {
    clock.classList.add("long-break-mode");
    document.getElementById("status").innerText = "Pausa longa";
  }
}

function startTimer() {
  if (interval) return;

  const { focus, shortBreak, longBreak } = getTimeInSeconds();
  let timeLeft = isWorking
    ? focus
    : (cycle < 4 ? shortBreak : longBreak);

  updateClockColor();

  interval = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    document.getElementById("timer").innerText = `${minutes}:${seconds}`;
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(interval);
      interval = null;

      if (isWorking) {
        cycle++;
      } else if (cycle >= 4) {
        cycle = 0;
      }

      isWorking = !isWorking;
      startTimer(); // inicia o próximo ciclo automaticamente
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(interval);
  interval = null;
  isWorking = true;
  cycle = 0;

  const focus = parseInt(document.getElementById("inputFocus").value) || 25;
  document.getElementById("timer").innerText = `${focus.toString().padStart(2, '0')}:00`;
  document.getElementById("status").innerText = "Tempo de foco";

  const clock = document.querySelector(".clock");
  clock.classList.remove("short-break-mode", "long-break-mode");
  clock.classList.add("focus-mode");
}

const noteInput = document.getElementById('noteInput');
const saveButton = document.getElementById('saveButton');

function saveNotes() {
    const notes = noteInput.value;
    localStorage.setItem('savedNotes', notes);
    alert('Anotações salvas!');
}

function loadNotes(){
  const savedNotes = localStorage.getItem('savedNotes');
  if (savedNotes) {
      noteInput.value = savedNotes;
  }
}

window.onload = loadNotes;

saveButton.addEventListener('click', saveNotes);