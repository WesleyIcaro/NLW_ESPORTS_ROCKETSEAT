"use strict";
exports.__esModule = true;
exports.convertHourStringToMinutes = void 0;
function convertHourStringToMinutes(hourString) {
    var _a = hourString.split(';').map(Number), hours = _a[0], minutes = _a[1];
    var minutesAmount = (hours * 60) + minutes;
    return minutesAmount;
}
exports.convertHourStringToMinutes = convertHourStringToMinutes;
