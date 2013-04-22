"use strict";

var app = module.parent.app;

app.all("/test/data/if_modified_since.php", function (req, res) {
	var
		ts = req.request.ts,
		ifModifiedSince = req.get("If-Modified-Since") || false;

	if (ifModifiedSince === ts) {
		res.status(304);
		res.send(null);
		return;
	}

	res.set("Last-Modified", ts);

	if (ifModifiedSince) {
		res.send("OK:" + ts);
	} else {
		res.send("FAIL");
	}
});
//5
