const EventEmitter = require('events');


class ReactiveEmitter extends EventEmitter {

  constructor(){
    super();
    this.attributes = new Map();
  }

  attribute(key, value){

    let action = undefined;
    if(value) {
      action = 'set';
    } else {
      action = 'get';
    }

    let response = null;

    if(action == 'get'){
      response = this.attributes.get(key);
    } else if(action == 'set'){
      const oldValue = this.attributes.get(key);
      const newValue = value;

      if(oldValue != newValue){
        response = this.attributes.set(key, value);
        this.emit(`attribute:${key}:change`, {old:oldValue , new:newValue });
      }

    }
    return response;

  }

  hook(eventName, eventHandler){
    const local = this;

    const maker = (bindingContext) => {
      return {
        attribute: function(key, value){
          if (bindingContext) {
            //console.log(`Logging that event ${eventName} depends on ${key}`);
            local.on( `attribute:${key}:change`, eventHandler.bind(maker(false)) );
          }else{
            //console.log(`Already logged that event ${eventName} depends on ${key}`);
          }
          return local.attribute( key , value );
        },
        hook: (...o) => this.hook(...o),
        emit: (...o) => this.emit(...o),
        on: (...o) => this.on(...o),
        off: (...o) => this.off(...o),
      }
    }

    // At first we call with binding, then from within, without becasue binding already occured.
    this.on( eventName, eventHandler.bind(maker(true)) );
  } // hook

}

module.exports = ReactiveEmitter;
