"use strict";

var app = module.parent.app;

app.get("/xhtml.php", function (req, res) {
  res.set("Content-Type", "application/xhtml+xml");
  res.sendfile("index.html");
});
//5
