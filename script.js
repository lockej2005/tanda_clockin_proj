

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
    const ONE_MINUTE = 60;
    const ONE_DAY = 24;
    const SECONDS_IN_A_DAY = 3600


  
    function startTimer() {
      timerInterval = setInterval(updateTimer, 1000);
      timerElement.style.display = "flex";
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
      const payRate = 23.23
    
      var totalSeconds = hours * SECONDS_IN_A_DAY + minutes * ONE_MINUTE + seconds;
      var earnings = totalSeconds * (payRate / SECONDS_IN_A_DAY);
    
      if (isNaN(earnings)) {
        currentEarnings.textContent = '$0.00';
      } else {
        currentEarnings.textContent = '$' + earnings.toFixed(2);
      }
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
      var ripple = document.createElement("span");
  
      ripple.className = "ripple";

      var x = event.clientX - event.target.offsetLeft;
      var y = event.clientY - event.target.offsetTop;
  
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
  

      event.target.appendChild(ripple);
  
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
        clickArea.style.backgroundColor = '#0da5e0'; 
        timerElement.style.fontFamily = "Inconsolata"; 

        startTimer(); 
        createRipple(event); 
      } else {
        overlay.style.display = 'flex';
        overlay1.style.display = 'none';
        textInput.style.display = 'none';
        button.textContent = 'CLOCK IN';
        clickArea.style.backgroundColor = ''; 
        stopTimer(); 
        resetTimer(); 
        timerElement.style.display = "none"; 
        createRipple(event); 
      }
      isClicked = !isClicked;
    }
  

    clickArea.addEventListener('click', handleClick);
  

    button.addEventListener('click', handleClick);
  });
  