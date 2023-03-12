import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";

let selectedTime = null;

const refs = {
    inputDate: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('.value[data-days]'),
    hours: document.querySelector('.value[data-hours]'),
    minutes: document.querySelector('.value[data-minutes]'),
    seconds: document.querySelector('.value[data-seconds]'),
}    

class Timer {
    constructor({ onTick }) {
      this.timerID = null;
      this.isActive = false;
      this.onTick = onTick;
      refs.startBtn.disabled = true;
    }
  
    start() {
      if (this.isActive) {
        return;
      }
  
      const startTime = Date.now();
      this.isActive = true;
      this.timerID = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = selectedTime - currentTime;
        if (deltaTime <= 0) {
          this.stop();
          return;
        }

        const time = this.getTimeComponents(deltaTime);
        this.onTick(time);   
      }, 1000);
    }
  
    stop() {
      clearInterval(this.timerID); console.log(this.timerID);
      refs.startBtn.disabled = true;
    }

    getTimeComponents(ms) {
        // Number of milliseconds per unit of time
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
      
        // Remaining days
        const days = this.addLeadingZero(Math.floor(ms / day));
        // Remaining hours
        const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
        // Remaining minutes
        const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
        // Remaining seconds
        const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
      
        return { days, hours, minutes, seconds };
    }

    addLeadingZero(value) {
        return String(value).padStart(2, '0');
    }
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      //console.log(selectedDates[0]);
      if (selectedDates[0] <= Date.now()) {
        Notify.failure('Please choose a date in the future');
        selectedDates[0] = new Date();
      }
      else {
        selectedTime = selectedDates[0];
        refs.startBtn.disabled = false;
      }
    },
};
  
function updateClockFace({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
}

const timer = new Timer({
    onTick: updateClockFace,
});

flatpickr(refs.inputDate, options);
refs.startBtn.addEventListener('click', () => timer.start());