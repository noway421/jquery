"use strict";

module.exports = function (req, res, done) {
	res.setHeader("Content-Type", "atom+xml");
	res.statusCode = 200;
	res.end(
		"<root>\n" +
		"  <element />\n" +
		"</root>\n"
	);
	done();
};
//5
