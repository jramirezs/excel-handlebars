var assert = require('assert');
var xlsx = require('xlsx-to-json');
var should = require('should');

describe("Convert Excel to JSON", function() {
  describe("A file with 10 rows and 3 columns", function() {
    it("should return a valid JSON", function(done) {
      xlsx({
        input: 'test/test_file.xlsx',
        output: null
      }, function(err, result) {
        assert.equal(result.length, 10);
        should.not.exist(err);
        result.should.be.an.instanceOf(Object);
        done();
      })
    })
  })
})
