

document.addEventListener('DOMContentLoaded', function() {
    var clickArea = document.querySelector('.clickarea');
    var overlay = document.querySelector('.overlay');
    var overlay1 = document.querySelector('.overlay1');
    var textInput = document.querySelector('.textinput');
    var button = document.querySelector('.button');
    var timerElement = document.getElementById("timer");
    var timer = document.querySelector('.timer');
    var timerInterval;
    var seconds = 0, minutes = 0, hours = 0;
    var isClicked = false;
    var timerElement = document.getElementById("timer");
    var currentEarnings = document.querySelector('.currentEarnings');
    var earningsInterval;
  
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
    function updateEarnings() {
        var time = timerElement.textContent;
        var timeArray = time.split(':');
        var hours = parseInt(timeArray[0]);
        var minutes = parseInt(timeArray[1]);
        var seconds = parseInt(timeArray[2]);
        var payRate = 23.23
        
        var totalSeconds = hours * 3600 + minutes * 60 + seconds;
        var earnings = totalSeconds * (payRate / 3600);
        
        currentEarnings.textContent = '$' + earnings.toFixed(2);
      }
      
      earningsInterval = setInterval(updateEarnings, 1000);

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
  
    function createRipple(event) {
      // Create a ripple element
      var ripple = document.createElement("span");
  
      // Set the ripple class
      ripple.className = "ripple";
  
      // Get the click position
      var x = event.clientX - event.target.offsetLeft;
      var y = event.clientY - event.target.offsetTop;
  
      // Set the ripple position
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
  
      // Append the ripple to the clickarea
      event.target.appendChild(ripple);
  
      // Remove the ripple element after the animation completes
      setTimeout(function() {
        ripple.remove();
      }, 800);
    }
  
    function handleClick(event) {
      if (!isClicked) {
        overlay.style.display = 'none';
        overlay1.style.display = 'flex';
        textInput.style.display = 'block';
        timer.style.display = 'flex';
        button.textContent = 'CLOCK OUT';
        clickArea.style.backgroundColor = '#0da5e0'; // Set the background color to dark blue
        timerElement.style.fontFamily = "Inconsolata"; // Set the font family to "Roboto"

        startTimer(); // Start the timer when clicked
        createRipple(event); // Create the ripple effect
      } else {
        overlay.style.display = 'flex';
        overlay1.style.display = 'none';
        textInput.style.display = 'none';
        button.textContent = 'CLOCK IN';
        clickArea.style.backgroundColor = ''; // Revert to the original background color
        stopTimer(); // Stop the timer when clicked
        resetTimer(); // Reset the timer when clicked
        timerElement.style.display = "none"; // Hide the timer
        createRipple(event); // Create the ripple effect
      }
      isClicked = !isClicked;
    }
  
    // Add a click event listener to the clickarea
    clickArea.addEventListener('click', handleClick);
  
    // Add a click event listener to the button
    button.addEventListener('click', handleClick);
  });
  