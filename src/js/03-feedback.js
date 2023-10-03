const feedbackForm = document.querySelector('.feedback-form');
const throttle = require('lodash.throttle');
const STORAGE_KEY = 'feedback-form-state';

const { email, message } = feedbackForm.elements;
let feedbackFormState = {};

if (localStorage[STORAGE_KEY]) {
  try {
    feedbackFormState = JSON.parse(localStorage.getItem(STORAGE_KEY));
    email.value = feedbackFormState.email;
    message.value = feedbackFormState.message;
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}

feedbackForm.addEventListener('input', throttle(inputHandler, 500));
feedbackForm.addEventListener('submit', submitHandler);

function inputHandler() {
  feedbackFormState.email = email.value;
  feedbackFormState.message = message.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackFormState));
  // console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
}

function submitHandler(event) {
  event.preventDefault();
  if (email.value === '' || message.value === '') {
    alert(`You must fill out all fields of the form!`);
    return;
  }
  console.log(feedbackFormState);
  localStorage.removeItem(STORAGE_KEY);
  email.value = '';
  message.value = '';
  feedbackFormState = {};
}
