import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', createPromiseOnSubmit);

function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
        const shouldResolve = Math.random() > 0.3;
  
        setTimeout(() => {
            if (shouldResolve) {
                // Fulfill
                resolve({ position, delay });
            } else {
                // Reject
                reject({ position, delay });
            }
        }, delay);
    });
}

function createPromiseOnSubmit(e) {
  e.preventDefault();

  let delayValue = Number(e.currentTarget.delay.value);
  const stepValue = Number(e.currentTarget.step.value);
  const amountValue = Number(e.currentTarget.amount.value);

  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
      
      delayValue += stepValue;
  }
}
