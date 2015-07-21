var assert = require('assert');
var converter = require('../lib/converter');
var should = require('should');

describe("Create a snippet based on a Handlebars template", function() {
  it("should return expected snippet", function(done) {
    //Create
    var template = "<ul>";
    template = template + "{{#each data}}";
    template = template + "<li>{{row1}}</li>";
    template = template + "<li>{{row2}}</li>";
    template = template + "<li>{{row3}}</li>";
    template = template + "{{/each}}";
    template = template + "</ul>";

    converter(template, "test/test_file.xlsx", function(err, result, excelData) {
      //Create result mannualy using the data
      var assertResult = "<ul>";
      for (var i = 0; i < excelData.data.length; i++) {
        assertResult = assertResult + "<li>" + excelData.data[i].row1 + "</li>";
        assertResult = assertResult + "<li>" + excelData.data[i].row2 + "</li>";
        assertResult = assertResult + "<li>" + excelData.data[i].row3 + "</li>";
      }
      assertResult = assertResult + "</ul>";

      assert.equal(result, assertResult);
      done();
    });
  })
})
