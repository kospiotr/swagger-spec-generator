'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.swagger_spec_generator = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('test/tmp/spec.json');
    var expected = grunt.file.read('test/expected/default_options.json');
    test.equal(actual, expected, 'should output default swagger spec file');

    test.done();
  },
  override_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('test/tmp/override_options.json');
    var expected = grunt.file.read('test/expected/override_options.json');
    test.equal(actual, expected, 'should output swagger spec file with overriden sections');

    test.done();
  },
  require_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('test/tmp/require_options.json');
    var expected = grunt.file.read('test/expected/require_options.json');
    test.equal(actual, expected, 'should output swagger spec file with required external sections');

    test.done();
  },
};
