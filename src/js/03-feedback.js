const feedbackForm = document.querySelector('.feedback-form');
const throttle = require('lodash.throttle');

let feedbackFormState = {};

if (localStorage['feedback-form-state']) {
  try {
    feedbackFormState = JSON.parse(localStorage.getItem('feedback-form-state'));
    feedbackForm.elements.email.value = feedbackFormState.email;
    feedbackForm.elements.message.value = feedbackFormState.message;
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}

feedbackForm.addEventListener('input', throttle(inputHandler, 500));
feedbackForm.addEventListener('submit', submitHandler);

function inputHandler() {
  feedbackFormState.email = feedbackForm.elements.email.value;
  feedbackFormState.message = feedbackForm.elements.message.value;
  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify(feedbackFormState)
  );
  //   console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
}

function submitHandler(event) {
  event.preventDefault();
  console.log(feedbackFormState);
  localStorage.removeItem('feedback-form-state');
  feedbackForm.elements.email.value = '';
  feedbackForm.elements.message.value = '';
  feedbackFormState = {};
}
