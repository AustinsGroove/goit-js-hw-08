import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

if (localStorage['videoplayer-current-time']) {
  player.setCurrentTime(
    JSON.parse(localStorage.getItem('videoplayer-current-time'))
  );
}

player.on('timeupdate', throttle(timeUpdateHandler, 1000));

function timeUpdateHandler(event) {
  localStorage.setItem(
    'videoplayer-current-time',
    JSON.stringify(event.seconds)
  );
  console.log(localStorage.getItem('videoplayer-current-time'));
}
