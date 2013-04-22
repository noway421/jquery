"use strict";

var app = module.parent.app;

app.all("/test/data/errorWithJSON.php", function (req, res) {
	res.set("Content-Type", "application/json");
	res.status(400);
	res.send("{ \"code\": 40, \"message\": \"Bad Request\" }");
	//res.send({ code: 40, message: "Bad Request" });
});
//5