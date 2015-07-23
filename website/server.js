var fs = require('fs');
var express = require('express');
var bodyParser = require("body-parser");
var multer = require('multer');
var converter = require('../converter/lib/converter');

var app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/server/views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded

app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + "/public"));

//Routings
app.get("/", function(req, res){
  res.render("index", { template: '', result: '' });
});

var upload = multer({
  dest: __dirname + '/public/upload/'
})

app.post('/', function(req, res, next) {
  var selfReq = req;
  upload.single('file')(req, res, function(err) {
    if (err) throw err;

    var template = req.body.template;
    var filePath = req.file.path;

    converter(template, filePath, function (err, snippet) {
      var result = err ? err : snippet;

      fs.unlink(filePath);
      res.render('index', { template: template, result: result });
    });
  })
})

var port = process.env.PORT || 3030;
app.listen(port, function(argument) {
  console.log("Init in port: " + port);
});
