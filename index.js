const internal = require('./internal');

// construct the initial library
const library = {doesNothing: function(){}};

Object.assign( library, internal );

const core = {};

module.exports = function(object, { modules }){

  // extend library with user modules;
  Object.assign(library , modules);


  const builder = new Proxy(core,

  {
    get: function(obj, prop) {

      const description = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
      const [verb, noun] = description.split("-");

      if(!verb) throw new Error('Verb is missing.')
      if(!noun) throw new Error('Noun is missing.')

      console.log([verb, noun]);
      // const id = (prop.split(/^[a-z]+/, 2)[1]||"").toLowerCase();
      //
      // if(id){
      //
      //   console.log("const %s = require('./lib/%s')(root)", id,id);
      //   if(library[id]){
      //     library[id](root);
      //   }else{
      //     throw new Error(`Item not in library: ${id.replace(/[^a-z]/g,'?')}, library contains ${Object.keys(library).map(i=>i.replace(/[^a-z]/g,'?')).map(i=>`"${i}"`).join(', ')}.`)
      //   }
      //
      // }else{
      //
      // }


      // always return builder
      return ()=>builder;
    }, // get
  }

  );

  return builder;
}
