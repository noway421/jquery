"use strict";

var app = module.parent.app;

app.all("/test/data/json.php", function (req, res) {
	if (req.request.header) {
		res.set("Content-type", "application/json");
	}
	if (req.request.json) {
		//res.send('[ {"name": "John", "age": 21}, {"name": "Peter", "age": 25 } ]');
		res.send([ {name: "John", age: 21}, {name: "Peter", age: 25 } ]);
	} else {
		//res.send('{ "data": {"lang": "en", "length": 25} }');
		res.send({ data: {lang: "en", length: 25} });
	}
});
//5
