"use strict";

var app = module.parent.app;

app.all("/test/data/params_html.php", function (req, res) {
	res.render(__dirname + "/params_html.view.ejs", { post: req.body, get: req.query });
});
//5