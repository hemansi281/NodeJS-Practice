const now = Date.now();
console.log(now)

const timestamp = new Date("August 6, 2025 23:15:30");
console.log(timestamp);                     //2025-08-06T17:45:30.000Z UTC time = Indian time  - 5:30
console.log(timestamp.getDate())        //6
console.log(timestamp.getMonth())       //7 (0-11 : Jan-Dec)
console.log(timestamp.getFullYear())    //2025
console.log(timestamp.getHours())       //23
console.log(timestamp.getMinutes())     //15
console.log(timestamp.getSeconds())     //30
console.log(timestamp.getMilliseconds())    //0
console.log(timestamp.getTimezoneOffset())      //-330(minutes)
console.log(timestamp.getDay())         //3 (0-6 : sunday-saturday)
console.log(timestamp.getUTCDate())     //6

const timestamp1 = new Date("August 6, 2025 3:15:30");
console.log(timestamp1.getDate())           //6
console.log(timestamp1.getUTCDate())        //5
console.log(timestamp1.toDateString())      //Wed Aug 06 2025
console.log(timestamp1.toTimeString())      //03:15:30 GMT+0530 (India Standard Time)
console.log(timestamp1.toLocaleDateString())    //6/8/2025
console.log(timestamp1.toLocaleString())        //6/8/2025, 3:15:30 am
console.log(timestamp1.toISOString())       //2025-08-05T21:45:30.000Z
console.log(timestamp1.toUTCString())       //Tue, 05 Aug 2025 21:45:30 GMT

const dt = new Date(1993, 6, 28, 14, 39, 7);
// console.log(dt.toDateString())              //Wed Jul 28 1993   

const date = new Date('2025-12-02');
date.setDate(3)
console.log(date);
