"use strict";

var app = module.parent.app;

app.all(/^\/test\/data\/atom\+xml\.php$/, function (req, res) {
	res.set("Content-Type", "atom+xml");
	res.send(
		"<root>\n" +
		"  <element />\n" +
		"</root>\n"
	);
});
//5