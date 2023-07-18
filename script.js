document.addEventListener('DOMContentLoaded', function () {
  const app = new Vue({
    el: '#app',
    data: {
      shifts: [],
    },
    created: function () {
      fetch('shifts.json')
        .then((response) => response.json())
        .then((data) => {
          data.forEach((shift) => {
            let [dayName, date, month, year] = shift.date.split(' ');
            date = date.replace(/(st|nd|rd|th)/, '');
            let [time, period] = shift.clock_in.split(/\s/);
            let [hour, minute] = time.split(':');
            hour = parseInt(hour);
            minute = parseInt(minute);
            if (period && period.toLowerCase() === 'pm' && hour !== 12) {
              hour += 12;
            } else if (period && period.toLowerCase() === 'am' && hour === 12) {
              hour = 0;
            }
            let newDateStr = `${month} ${date}, ${year} ${hour}:${minute}:00`;
            shift.dateTime = new Date(Date.parse(newDateStr));
          });
          data.sort((a, b) => b.dateTime - a.dateTime);
          this.shifts = data;
        });
    },
    mounted: function () {
      var clickArea = this.$el.querySelector('.clickarea');
      var overlay = this.$el.querySelector('.overlay');
      var overlay1 = this.$el.querySelector('.overlay1');
      var textInput = this.$el.querySelector('.textinput');
      var button = this.$el.querySelector('.button');
      var timerElement = this.$el.querySelector("#timer");
      var timer = this.$el.querySelector('.timer');
      var timerInterval;
      var seconds = 0, minutes = 0, hours = 0;
      var isClicked = false;
      var currentEarnings = this.$el.querySelector('.currentEarnings');
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

        setTimeout(function () {
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
    },
  });
});
