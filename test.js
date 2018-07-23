const ReactiveEmitter = require('./reactive-emitter');

const Builder = require('.');

const modules = {
  foo: function(){},
  quux: function(){},
};

// Create a base object
const object = new ReactiveEmitter();

// Build it up with enhancements (This represents prototypal Inheritance, everything runs in a chain, automatically)
Builder(object, { modules })
  // .useEmitter()
  // .usesEvents()
  // .inheritsObjects()
  // .hasEmitter()
  // .withActions()
  // .testFeatures()

// At this point object has been enhanced and we can use its features as such:

object.emit('test');
object.attribute('name', 'Alice');
object.attribute('mail', 'alice@example.com');

object.on('displayBusinessCardObject', function(card){
  console.log('displayBusinessCardObject:', card);
});

object.hook('makeBusinessCardObject', function(){

  const name = this.attribute('name');
  const mail = this.attribute('mail');

  const card = { name, mail };

  object.emit('displayBusinessCardObject', card);

});



// - - -- -- Show Result -- -- - - //
// console.log ( object ) ;
// console.log ( object.constructor.name ) ;
//
// console.log ( object ) ;

console.log("First call...")
object.emit('makeBusinessCardObject');



console.log ( '\n\n2: ---\n\n' ) ;

object.attribute('mail', 'alice@example.com');


console.log ( '\n\n3: ---\n\n' ) ;
object.attribute('mail', 'alice@example.com');
