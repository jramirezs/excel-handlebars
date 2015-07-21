var xlsx = require('xlsx-to-json');
var handlebars = require('handlebars');

var converter = function(template, input, callback) {
  var excelData = {};
  var hbTemplate;
  var result = "";

  xlsx({
    input: input,
    output: null
  }, function(err, result) {
    try {
      if (err) throw err;
      excelData.data = result;

      hbTemplate = handlebars.compile(template)
      result = hbTemplate(excelData);
      callback(null, result, excelData);
    } catch (err) {
      callback(err, null, null);
    }
  })
}

module.exports = converter;
