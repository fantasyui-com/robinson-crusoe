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

    let deliverance = null;

    if(action == 'get'){
      deliverance = this.attributes.get(key);
    } else if(action == 'set'){
      this.emit(`attribute:${key}:change`, {old: this.attributes.get(key), new: value });
      deliverance = this.attributes.set(key, value);
    }

    return deliverance;

  }

  hook(eventName, eventHandler){
    const local = this;

    const handlerContext = {
      attribute: function(key, value){
        //console.log('"%s" asked about key "%s"', eventName, key,);
        return local.attribute( key, value );
      }
    };
    const handlerLoggingContext = {
      attribute: function(key, value){
        //console.log('Binding!, "%s" cares about key "%s", sitting in the tree k.i.s.s.i.n.g."', eventName, key,);
        local.on( `attribute:${key}:change`, eventHandler.bind(handlerContext) );
        return local.attribute( key, value );

      }
    };

    this.on( eventName, eventHandler.bind(handlerLoggingContext) );

  }

}

// const myEmitter = new MyEmitter();
//
// myEmitter.on('event', () => {
//   console.log('an event occurred!');
// });
// myEmitter.emit('event');


module.exports = ReactiveEmitter;
