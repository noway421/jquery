"use strict";

var app = module.parent.app;

app.all("/test/data/jsonp.php*", function (req, res) {
	var clbk = req.request.callback, tmp, jsonObj;

	if (!clbk) {
		tmp = req.originalUrl.split("/");
		clbk = tmp[tmp.length - 1].split("?")[0];
	}

	if (req.request.json) {
		jsonObj = [ {name: "John", age: 21}, {name: "Peter", age: 25 } ];
	} else {
		jsonObj = { data: {lang: "en", length: 25} };
	}

	res.send(clbk + "(" + JSON.stringify(jsonObj) + ")");
});
//5
