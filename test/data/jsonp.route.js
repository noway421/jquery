"use strict";

var connect = require("connect");
var utils = connect.utils;
var querystring = require("querystring");
var url = require("url");

module.exports = function (req, res, done) {
	connect.bodyParser()(req, res, function () {
		req.query = querystring.parse(url.parse(req.url).query);
		req.request = utils.merge(req.query, req.body);

		var clbk = req.request.callback, tmp, jsonObj;

		if (!clbk) {
			tmp = req.url.split("/");
			clbk = tmp[tmp.length - 1].split("?")[0];
		}

		if (req.request.json) {
			jsonObj = [ {name: "John", age: 21}, {name: "Peter", age: 25 } ];
		} else {
			jsonObj = { data: {lang: "en", length: 25} };
		}

		res.statusCode = 200;
		res.end(clbk + "(" + JSON.stringify(jsonObj) + ")");

		done();
	});
};
//5
