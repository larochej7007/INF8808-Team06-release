var express = require('express');
var app = express();

var port = process.env.PORT || 8080

app.use(express.static(__dirname + "/dist"));
app.use("/assets", express.static(__dirname + '/assets'));

app.get("/", function(req, res) {
    res.render("index.js");
})

app.listen(port, function() {
    console.log("app running");
})