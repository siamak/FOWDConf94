var place	 = $('.date-show'),
	days     = $('.days'),
	hours    = $('.hours'),
	minutes  = $('.minutes'),
	seconds  = $('.seconds');


/**
* Used for convert English numbers to Persian (https://github.com/usablica/persian.js/blob/master/persian.js)
*
* @api private
* @method _englishNumber
* @param {String} value 
* @return {Object} PersianJs Object
*/
function _englishNumber(value) {
    var englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];

    for (var i = 0, numbersLen = englishNumbers.length; i < numbersLen; i++) {
        value = value.replace(new RegExp(englishNumbers[i], "g"), persianNumbers[i]);
    }
    this._str = value;
    return _str;
}



var getTimeToConference = function() {
	var currentTime 	= new Date(),
		confTime        = new Date(confDate), // Define Date located at dev/data/config.json
		timeToConf      = confTime - currentTime,
		daysToConf      = Math.floor(timeToConf / 86400000), // 86400000 ms in a day
		hoursToConf     = Math.floor( (timeToConf % 86400000) / 3600000), // 3600000ms in an hour
		minutesToConf   = Math.floor( ((timeToConf % 86400000) % 3600000) / 60000 ), // 60000 ms in a minute
		secondsToConf   = Math.floor( ( ((timeToConf % 86400000) % 3600000) % 60000) / 1000);


	days.html(_englishNumber(daysToConf.toString()));
	hours.html(_englishNumber(hoursToConf.toString()));
	minutes.html(_englishNumber(minutesToConf.toString()));
	seconds.html(_englishNumber(secondsToConf.toString()));

	if(timeToConf < 0){
		place.remove();
	}
};

window.setInterval(getTimeToConference, 1000);

