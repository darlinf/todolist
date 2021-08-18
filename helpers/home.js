const getCurrentDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = String(today.getFullYear());
  return {months: mm, day: dd, year: yyyy};
};

const timeConvert = n => {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = '' + Math.round(minutes);
  if (rhours !== 0) {
    return (
      rhours + ':' + (rminutes.length == 1 ? '0' + rminutes : rminutes) + ' hrs'
    );
  } else {
    return rminutes + ' min';
  }
};

const timeConvertTotalSum = n => {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = '' + Math.round(minutes);
  if (rhours !== 0) {
    return (
      rhours +
      ':' +
      (rminutes.length == 1 ? '0' + rminutes : rminutes) +
      ' hours'
    );
  } else {
    return rminutes + ' minutes';
  }
};

const isCurrentTask = elem => {
  let timeToStart = parseFloat(elem.timeStart.slice(0, 5).replace(':', '.'));
  let timeToFinish = parseFloat(
    sumMinutes(elem.timeStart.slice(0, 5), elem.timeEnd).replace(':', '.'),
  );
  let d = new Date(); // for now
  let currentTime = parseFloat(d.getHours() + '.' + d.getMinutes());
  return currentTime > timeToStart && currentTime < timeToFinish;
};

const sumMinutes = (timeInHour, minutesToSum) => {
  var timeParts = timeInHour.split(':');
  var hoursInMinutes = Number(timeParts[0]) * 60 + Number(timeParts[1]);
  var totalTimeInMin = parseInt(hoursInMinutes) + parseInt(minutesToSum);
  var minutesConvert = (totalTimeInMin % 60) + '';
  var minutesConvertResurt =
    minutesConvert.length == 1 ? '0' + minutesConvert : minutesConvert;
  var resurt = Math.floor(totalTimeInMin / 60) + ':' + minutesConvertResurt;
  return resurt;
};

export default {
  getCurrentDate,
  timeConvert,
  timeConvertTotalSum,
  isCurrentTask,
  sumMinutes,
};
