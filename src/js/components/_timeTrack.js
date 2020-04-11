
var startTime = '11:00';
var endTime = '21:00';
var trackStepInMin = 10;
var pxPerMinute = 50 / trackStepInMin;
var startTimeInMin = timeToMinutes(startTime);
var endTimeInMin = timeToMinutes(endTime);
var confDurationInMin = endTimeInMin - startTimeInMin;
var confDurationInHours = confDurationInMin / 60;
var timelineWidth = confDurationInMin * pxPerMinute;
var timeline = document.getElementById('js-timeline');
var trackItems = document.getElementsByClassName('js-time');
var currentTimeElem = document.getElementById('js-current-time');
var trackHead = document.getElementById('js-track-head');
var splittedStartTime = startTime.split(':');
var trackLines = '';

function timeToMinutes(time) {
  var hm = time;
  var a = hm.split(':');
  var minutes = (+a[0]) * 60 + (+a[1]);
  return minutes;
}

function leadingZero(n) {
  if (n < 10 && n >= 0)
    return '0' + n;
  else
    return n;
};

function getTime() {
  var currentDate = new Date();
  var currentHours = currentDate.getHours();
  var currentMinutes = currentDate.getMinutes();
  currentHours = leadingZero(currentHours);
  currentMinutes = leadingZero(currentMinutes);
  document.getElementById('js-current-time').innerHTML = currentHours + ':' + currentMinutes;
  return currentHours + ':' + currentMinutes;
}

function setTimeLinePosition() {
  var minutes = timeToMinutes(currentTime);
  var minutesUpdated;
  minutesUpdated = minutes - startTimeInMin;
  document.getElementById('js-current-time-track').style.left = (minutesUpdated * pxPerMinute) + 26 + 'px';
}

if (currentTimeElem) {
  for ( var i = 0; i < confDurationInHours; i++ ) {
    var hours = splittedStartTime[0];
    hours = parseInt(hours) + i;
    var trackLines;
    var trackLine;

    for ( var j = 0; j < 60; j = j + trackStepInMin ) {
      var minutes;
      minutes = parseInt(splittedStartTime[1]) + j;
      minutes = leadingZero(minutes);
      trackLine = '<div class="time-track__head-item">' + hours + ':' + minutes + '</div>';
      trackLines = trackLines + trackLine;
    }
  }

  trackLines = trackLines + '<div class="time-track__head-item">' + endTime + '</div>';
  trackHead.innerHTML = trackLines;
  timeline.style.width = timelineWidth + 52 + 'px';

  for(var i=0; i< trackItems.length; i++) {
    var minutes;
    var duration;
    var minutesUpdated;
    var itemPosLeft;
    var itemWidth;
    minutes = timeToMinutes(trackItems[i].dataset.time);
    duration = trackItems[i].dataset.duration;
    minutesUpdated = minutes - startTimeInMin;
    itemPosLeft = (minutesUpdated * pxPerMinute) + 26 + 'px';
    itemWidth = duration * pxPerMinute - 1 + 'px';
    trackItems[i].style.width = itemWidth;
    trackItems[i].style.left = itemPosLeft;
  }

  var currentTime = getTime();

  setTimeLinePosition();

  var x = setInterval(function() {
    currentTime = getTime();
    getTime();
    setTimeLinePosition();
  }, 5000);

}