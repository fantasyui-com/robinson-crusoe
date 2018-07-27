const ora = require('ora');

const spinner = ora('Washing Machine').start();

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
object.attribute('name', 'Washing');
object.attribute('thing', 'Dog');

object.on('UpdateMessage', function(data){
  // console.log('CALLED: UpdateMessage:', card);
  spinner.color = 'yellow';
  spinner.text = object.attribute('name') + ' ' + data.thing;

});

object.hook('CreateMessage', function(){
  // console.log('CALLED: CreateMessage');

  const name = this.attribute('name');
  const thing = this.attribute('thing');
  const data = { name, thing };

  this.emit('UpdateMessage', data);
});







// LATER ...

setTimeout(function(){
  object.emit('CreateMessage');
},2000)

setTimeout(function(){
  object.attribute('thing', 'Horse');
},4000)

setTimeout(function(){
  object.attribute('thing', 'Hands');
},6000)

setTimeout(function(){
  spinner.stop();
  process.exit(0)
},10000)
