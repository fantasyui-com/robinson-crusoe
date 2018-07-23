const EventEmitter = require('events');

const coreLib = require('./lib');

class MyEmitter extends EventEmitter {}


const root = null;
const core = {};

module.exports = function({lib}){

  const required = Object.assign({},coreLib,lib);

  let builder = new Proxy(core,

  {
    get: function(obj, prop) {

      const isInitial = !!(root);

      if(isInitial){
        root = new MyEmitter();
        root.on('test', () => {
          console.log('test event occurred!');
        });
        root.emit('test');
      }

      const id = (prop.split(/^[a-z]+/, 2)[1]||"").toLowerCase();

      if(id){
        console.log("const %s = require('./lib/%s')(root)", id,id);
        if(required[id]){
          required[id](root);
        }else{
          throw new Error(`Item not in library: ${id.replace(/[^a-z]/g,'?')}, library contains ${Object.keys(required).map(i=>i.replace(/[^a-z]/g,'?')).map(i=>`"${i}"`).join(', ')}.`)
        }
      }else{

      }


      return opts => builder;
    },

    set: function(obj, prop, value) {
      // An extra property
      if (prop === 'latestBrowser') {
        obj.browsers.push(value);
        return true;
      }

      // Convert the value if it is not an array
      if (typeof value === 'string') {
        value = [value];
      }

      // The default behavior to store the value
      obj[prop] = value;

      // Indicate success
      return true;
    }
  }
  );

  return builder;
}
