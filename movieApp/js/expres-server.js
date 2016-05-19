var express = require('express');
var path = require('path');
var app = express();
var root = path.normalize(__dirname);
var port = 8880;
app.use(express.static(root));

app.listen(port, function() {
    console.log("root = " + root + " (" + __dirname +")");
    console.log("listen at port " + port);
});

