Themeleon Handlebars
====================

> [Handlebars] mixin for [Themeleon].

**Warning:** this repository/package is deprecated, template engines
will be handled by consolidate.js in Themeleon 3.0.

[Handlebars]: http://handlebarsjs.com
[Themeleon]: https://github.com/themeleon/themeleon

Installation
------------

In your `package.json`:

```json
{
  "dependencies": {
    "themeleon": "1.*",
    "themeleon-handlebars": "1.*"
  }
}
```

Usage
-----

Say we have the following theme structure:

```
views/
  foo/
    bar.handlebars
  foo.handlebars
  index.handlebars
```

```js
var themeleon = require('themeleon')();

// Use the Handlebars mixin
themeleon.use('handlebars');

// Or inject your own instance
themeleon.use('handlebars', require('handlebars'));

module.exports = themeleon(__dirname, function (t) {
  // Render index alone
  t.handlebars('views/index.handlebars', 'index.html');

  // Or include a partials object
  t.handlebars('views/index.handlebars', 'index.html', {
    foo: 'views/foo.handlebars',
    'foo/bar': 'views/foo/bar.handlebars',
  });

  // Or let the mixin resolve all `.handlebars` files in `views`
  // Note: `.handlebars` and `.hbs` extensions are supported.
  t.handlebars('views/index.handlebars', 'index.html', 'views');
});
```
