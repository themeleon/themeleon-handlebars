'use strict';

var assert = require('assert');
var fs = require('fs');
var themeleon = require('themeleon')();
var handlebars = require('../index');
var path = require('path');
var q = require('q');

themeleon.use(handlebars);

function testTheme(dest, expected, theme) {
  dest = path.resolve(__dirname, dest);
  expected = path.resolve(__dirname, expected);

  return themeleon(__dirname, theme)(__dirname, {title: 'Hello world!'})
    .then(function () {
      var destContent = fs.readFileSync(dest, 'utf8');
      var expectedContent = fs.readFileSync(expected, 'utf8');

      assert.equal(destContent, expectedContent);

      fs.unlink(dest);
    });
}

q()
  .then(function () {
    var src = 'views/test-single.handlebars';
    var dest = 'test-single.html';
    var expected = 'test-single.expected.html';

    return testTheme(dest, expected, function (t) {
      t.handlebars(src, dest);
    })
  })
  .then(function () {
    var src = 'views/test-partials.handlebars';
    var dest = 'test-partials-object.html';
    var expected = 'test-partials.expected.html';

    return testTheme(dest, expected, function (t) {
      t.handlebars(src, dest, {
        'foo': 'views/foo.handlebars',
        'foo/bar': 'views/foo/bar.handlebars',
      });
    });
  })
  .then(function () {
    var src = 'views/test-partials.handlebars';
    var dest = 'test-partials-directory.html';
    var expected = 'test-partials.expected.html';

    return testTheme(dest, expected, function (t) {
      t.handlebars(src, dest, 'views');
    });
  })
  .done();
