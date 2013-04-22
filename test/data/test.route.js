"use strict";

var app = module.parent.app;


app.all("/test/data/test.php", function (req, res) {
	var rand = Math.floor(Date.now()/1000) + "" + Math.floor(Math.random() * 32767);
	res.render(__dirname + "/test.view.ejs", { rand: rand });
});
//5

app.post("/test/data/test.js", function(req, res) {
	res.sendfile(__dirname + "/test.js");
});
//4