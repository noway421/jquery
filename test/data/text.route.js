"use strict";

var app = module.parent.app;

app.all("/test/data/text.php", function (req, res) {
	res.render(__dirname + "/text.view.ejs");
});
//5