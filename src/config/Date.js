function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatTime1(date) {

  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


// 获取上一天
function yesterday() {

  var date = new Date()
  date.setTime(date.getTime() - 24 * 60 * 60 * 1000);

  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

// 今天
function today() {
  var date = new Date()

  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

// 今个月
function thisMonth() {
  var date = new Date()

  var year = date.getFullYear()
  var month = date.getMonth() + 1

  return [year, month].map(formatNumber).join('-')
}


// 上一个月
function lastMonth() {

  var date = new Date()

  var daysInMonth = new Array([0], [31], [28], [31], [30], [31], [30], [31], [31], [30], [31], [30], [31]);

  var strYear = date.getFullYear();

  var strDay = date.getDate();

  var strMonth = date.getMonth() + 1;

  if (strYear % 4 == 0 && strYear % 100 != 0) {

    daysInMonth[2] = 29;

  }

  if (strMonth - 1 == 0)

  {

    strYear -= 1;

    strMonth = 12;

  } else

  {

    strMonth -= 1;
    S
  }

  strDay = daysInMonth[strMonth] >= strDay ? strDay : daysInMonth[strMonth];

  if (strMonth < 10)

  {

    strMonth = "0" + strMonth;

  }

  if (strDay < 10)

  {

    strDay = "0" + strDay;

  }

  var datastr = strYear + "-" + strMonth;

  return datastr;
}


function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export default {
  formatTime: formatTime,
  formatTime1: formatTime1,
  yesterday: yesterday,
  today: today,
  thisMonth: thisMonth,
  lastMonth: lastMonth,
}
