const Builder = require('.');

const lib = {
  foo: function(){},
  quux: function(){},
};

  const created = Builder({lib})
    .usesEvents()
    .inheritsObjects()
    .hasEmitter()
    .withActions()
    .make();
