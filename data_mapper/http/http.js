"use strict";

var http = require('http');

var status = ['400','401','403','404','408','414'];

module.exports.httpRequest = function(options,cb,body) {
	var req = http.request(options,onRequest);

	if(body) req.write(body);

	req.end();

	function onRequest(response) {
		var data = "";

		req.on('error', onError);

		response.on('data', onDataReceived);
		response.on('end', onEnd);

		//callbacks
		function onDataReceived(dataReceived) {
			data += dataReceived;
		}

		function onEnd() {
			cb(verifyStatusCode(response.statusCode),JSON.parse(data));
		}

		function onError(e) {
			cb(e,null);
		}
	}
}

function verifyStatusCode(statusCode){
	return status.contains(statusCode);
}
Array.prototype.contains = function(item) {
	for (var i in this) {
		if (this[i] == item) return Number(this[i]);
	}
	return false;
}
