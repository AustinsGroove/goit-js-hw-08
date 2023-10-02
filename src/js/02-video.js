import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

if (localStorage['videoplayer-current-time']) {
  try {
    player.setCurrentTime(
      JSON.parse(localStorage.getItem('videoplayer-current-time'))
    );
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}

player.on('timeupdate', throttle(timeUpdateHandler, 1000));

function timeUpdateHandler(event) {
  localStorage.setItem(
    'videoplayer-current-time',
    JSON.stringify(event.seconds)
  );
}
