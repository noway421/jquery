"use strict";

var app = module.parent.app;

app.all("/test/data/support/csp.php", function (req, res) {
	// Support: Firefox
	res.set("X-Content-Security-Policy", "default-src 'self'");

	// Support: Webkit, Safari 5
	// http://stackoverflow.com/questions/13663302/why-does-my-content-security-policy-work-everywhere-but-safari
	res.set("X-WebKit-CSP", "script-src " + req.host + " 'self'");

	res.set("Content-Security-Policy", "default-src 'self'");

	res.render(__dirname + "/csp.view.ejs");
});
//5
