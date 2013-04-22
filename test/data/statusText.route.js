"use strict";

var app = module.parent.app;

//!!! FIXME !!!

app.all("/test/data/statusText.php", function (req, res) {
	var status = req.query.status;//, text = req.query.text;

	res.status(status); // text not used
	res.send(null);
});
//2