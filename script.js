document.addEventListener('DOMContentLoaded', function () {
  // eslint-disable-next-line no-unused-vars, no-undef
  const app = new Vue({
    el: '#app',
    data: function () {
      return {
        shifts: []
      }
    },
    created: function () {
      const fetchJSON = () => {
        fetch('shifts.json')
          .then((response) => response.json())
          .then((data) => {
            if (data && Array.isArray(data.shifts)) {
              data.shifts.forEach((shift) => {
                let [date, month, year] = shift.date.split(' ')
                date = date.replace(/(st|nd|rd|th)/, '')
                const [time, period] = shift.clock_in.split(/\s/)
                let [hour, minute, seconds] = time.split(':')
                hour = parseInt(hour)
                minute = parseInt(minute)
                seconds = parseInt(seconds)
                if (period && period.toLowerCase() === 'pm' && hour !== 12) {
                  hour += 12
                } else if (period && period.toLowerCase() === 'am' && hour === 12) {
                  hour = 0
                }
                const newDateStr = `${month} ${date}, ${year} ${hour}:${minute}:${seconds}`
                shift.dateTime = new Date(Date.parse(newDateStr))
              })
              data.shifts.sort((a, b) => {
                const dateComparison = new Date(b.dateTime) - new Date(a.dateTime)
                if (dateComparison !== 0) {
                  return dateComparison
                } else {
                  const timeA = a.clock_in.split(':')
                  const timeB = b.clock_in.split(':')
                  const hourComparison = parseInt(timeB[0]) - parseInt(timeA[0])
                  const minuteComparison = parseInt(timeB[1]) - parseInt(timeA[1])
                  const secondComparison = parseInt(timeB[2]) - parseInt(timeA[2])

                  if (hourComparison !== 0) {
                    return hourComparison
                  } else if (minuteComparison !== 0) {
                    return minuteComparison
                  } else {
                    return secondComparison
                  }
                }
              })
              this.shifts = data.shifts
            } else {
              console.error('Invalid data format in shifts.json')
            }
          })
          .catch((error) => {
            console.error('Failed to fetch shifts data:', error)
          })
      }

      this.fetchJSON = fetchJSON
    },

    mounted: function () {
      setTimeout(() => {
        this.fetchJSON()
      }, 100)
      const clickArea = this.$el.querySelector('.clickarea')
      const overlay = this.$el.querySelector('.overlay')
      const overlay1 = this.$el.querySelector('.overlay1')
      const textInput = this.$el.querySelector('.textinput')
      const button = this.$el.querySelector('.button')
      const timerElement = this.$el.querySelector('#timer')
      const timer = this.$el.querySelector('.timer')
      let timerInterval
      let seconds = 0
      let minutes = 0
      let hours = 0
      let isClicked = false
      const currentEarnings = this.$el.querySelector('.currentEarnings')
      const ONE_MINUTE = 60
      const SECONDS_IN_A_DAY = 3600
      const HOURLY_PAY = 23.23
      let clockInTime, clockOutTime

      function startTimer () {
        timerInterval = setInterval(updateTimer, 1000)
        timerElement.style.display = 'flex'
      }

      function stopTimer () {
        clearInterval(timerInterval)
      }

      function resetTimer () {
        clearInterval(timerInterval)
        seconds = 0
        minutes = 0
        hours = 0
        timerElement.textContent = '00:00:00'
      }

      function updateEarnings () {
        const time = timerElement.textContent
        const timeArray = time.split(':')
        const hours = parseInt(timeArray[0])
        const minutes = parseInt(timeArray[1])
        const seconds = parseInt(timeArray[2])

        const totalSeconds = hours * SECONDS_IN_A_DAY + minutes * ONE_MINUTE + seconds
        const earnings = totalSeconds * (HOURLY_PAY / SECONDS_IN_A_DAY)

        if (isNaN(earnings)) {
          currentEarnings.textContent = '$0.00'
        } else {
          currentEarnings.textContent = '$' + earnings.toFixed(2)
        }
      }

      // eslint-disable-next-line no-undef
      earningsInterval = setInterval(updateEarnings, 1000)

      function updateTimer () {
        seconds++

        if (seconds >= 60) {
          seconds = 0
          minutes++

          if (minutes >= 60) {
            minutes = 0
            hours++
          }
        }

        const timeString = formatClock(hours) + ':' + formatClock(minutes) + ':' + formatClock(seconds)
        timerElement.textContent = timeString
      }

      function formatClock (time) {
        return time < 10 ? '0' + time : time
      }

      function createRipple (event) {
        const ripple = document.createElement('span')

        ripple.className = 'ripple'

        const x = event.clientX - event.target.offsetLeft
        const y = event.clientY - event.target.offsetTop

        ripple.style.left = x + 'px'
        ripple.style.top = y + 'px'

        event.target.appendChild(ripple)

        setTimeout(function () {
          ripple.remove()
        }, 800)
      }

      function handleClick (event) {
        if (!isClicked) {
          clockInTime = new Date()
          overlay.style.display = 'none'
          overlay1.style.display = 'flex'
          textInput.style.display = 'block'
          timer.style.display = 'flex'
          button.textContent = 'CLOCK OUT'
          clickArea.style.backgroundColor = '#0da5e0'
          timerElement.style.fontFamily = 'Inconsolata'
          startTimer()
          createRipple(event)
        } else {
          clockOutTime = new Date()
          overlay.style.display = 'flex'
          overlay1.style.display = 'none'
          console.log(clockOutTime)
          textInput.style.display = 'none'
          button.textContent = 'CLOCK IN'
          setTimeout(() => {
            this.fetchJSON()
          }, 100)
          clickArea.style.backgroundColor = ''
          stopTimer()
          resetTimer()
          timerElement.style.display = 'none'
          createRipple(event)
          const clockinformat = clockInTime.getTime()
          const clockoutformat = clockOutTime.getTime()
          console.log(clockoutformat)
          const shiftDuration = Math.floor((clockoutformat - clockinformat) / 1000)
          console.log(shiftDuration)
          const shiftCost = (shiftDuration) * (HOURLY_PAY / SECONDS_IN_A_DAY)

          const newShift = {
            date: formatDate(clockInTime),
            clock_in: formatTime(clockInTime),
            clock_out: formatTime(clockOutTime),
            price: '$' + shiftCost.toFixed(2),
            dateTime: clockInTime
          }

          saveShiftToFile(newShift)
        }
        isClicked = !isClicked
      }

      function formatDate (date) {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
        return date.toLocaleDateString('en-US', options)
      }

      function formatTime (date) {
        // eslint-disable-next-line no-undef
        return luxon.DateTime.fromJSDate(date).toFormat('HH:mm:ss')
      }

      function saveShiftToFile (shift) {
        const jsonData = JSON.stringify(shift, null, 2)

        // eslint-disable-next-line no-undef
        $.ajax({
          url: 'save-shifts.php',
          type: 'POST',
          data: jsonData,
          contentType: 'application/json',
          success: function () {
            console.log('Shift data saved successfully!')
          },
          error: function () {
            console.error('Failed to save shift data.')
          }
        })
      }

      clickArea.addEventListener('click', handleClick.bind(this))
      button.addEventListener('click', handleClick.bind(this))
    }
  })
})
