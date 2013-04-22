"use strict";

var app = module.parent.app;

app.all("/test/data/name.php", function (req, res) {
	var wait = req.request.wait || 0;

	wait *= 1000;

	setTimeout(function () {
		var xml = req.request.xml, name = req.request.name, result;
		if (xml) {
			res.set("Content-type", "text/xml");
			result = (xml === "5-2") ? "3" : "?";

			res.send("<math><calculation>" + xml + "</calculation><result>" + result + "</result></math>");
			return;
		}
		if (name === "foo") {
			res.send("bar");
			return;
		} else if (name === "peter") {
			res.send("pan");
			return;
		}

		res.send("ERROR <script type=\"text/javascript\">ok( true, 'name.php executed' );</script>");
	}, wait);
});
//4

app.post("/test/data/name.html", function(req, res) {
	res.sendfile(__dirname + "/name.html");
});
//4