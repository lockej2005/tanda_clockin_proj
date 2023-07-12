document.addEventListener('DOMContentLoaded', function() {
    var clickArea = document.querySelector('.clickarea');
    var overlay = document.querySelector('.overlay');
    var button = document.querySelector('.button');
    var timerElement = document.getElementById("timer");
    var timer = document.querySelector('.timer');
    var overlay1 = document.querySelector('.overlay1');
    var timerInterval;
    var seconds = 0, minutes = 0, hours = 0;
    var isClicked = false;
  
    function startTimer() {
      timerInterval = setInterval(updateTimer, 1000);
      timerElement.style.display = "flex"; // Show the timer
    }
  
    function stopTimer() {
      clearInterval(timerInterval);
    }
  
    function resetTimer() {
      clearInterval(timerInterval);
      seconds = 0;
      minutes = 0;
      hours = 0;
      timerElement.textContent = "00:00:00";
    }
  
    function updateTimer() {
      seconds++;
  
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
  
        if (minutes >= 60) {
          minutes = 0;
          hours++;
        }
      }
  
      var timeString = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
      timerElement.textContent = timeString;
    }
  
    function formatTime(time) {
      return time < 10 ? "0" + time : time;
    }
  
    clickArea.addEventListener('click', function(event) {
      if (!isClicked) {
        overlay.style.display = 'none';
        overlay1.style.display = 'flex';
        timer.style.display = 'flex';
        button.textContent = 'CLOCK OUT';
        clickArea.style.backgroundColor = '#3474eb'; // Set the background color to dark blue
        startTimer(); // Start the timer when clicked
      } else {
        overlay.style.display = 'flex';
        overlay1.style.display = 'none';
        button.textContent = 'CLOCK IN';
        clickArea.style.backgroundColor = ''; // Revert to the original background color
        stopTimer(); // Stop the timer when clicked
        resetTimer(); // Reset the timer when clicked
        timerElement.style.display = "none"; // Hide the timer
      }
      isClicked = !isClicked;
    });
  });
  