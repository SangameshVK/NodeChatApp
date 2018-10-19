// Jan 1st 1970 00:00:00 am unix epics
var moment = require('moment');

// var date = new Date().getMonth();
// var months = ['Jan', 'Feb']
// console.log(date);
console.log(new Date().getTime());
var date = moment(new Date().getTime());
console.log(moment().valueOf());
// date.add(1, 'year').subtract(12, 'months');
// date.add(8, 'minute').subtract(5, 'minute');
console.log(date.format('MMM Do, YYYY'));
console.log(date.format("h:mm a"))

// 10:35 am