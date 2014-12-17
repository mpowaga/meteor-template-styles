Template styles
===============

Make your template styles reactive.

##Installation##

```
meteor add mpowaga:template-styles
```

##Example##

```
<template name="hello">
  <button>Click me</button>
  <p class="message">You've pressed the button {{counter}} times.</p>
</template>
```

```
Template.hello.styles({
  '.message': function() {
    if (Session.get('counter') % 2 == 0) {
      return { color: 'red' };
    }
  },

  'button': {
    fontSize: function() {
      return Session.get('counter') + 10 + 'px';
    }
  }
});

Template.hello.events({
  'click button': function() {
    Session.set('counter', Session.get('counter') + 1);
  }
})
```

##Stoping computation##

`computation` object is passed to every function call.

e.g.

```
Template.hello.styles({
  'button': function(computation) {
    var counter = Session.get('counter');

    if (counter > 30) {
      return computation.stop();
    }

    return {
      fontSize: counter + 10 + 'px'
    };
  }
});
```

##Details##

`styles` function takes an object which keys are valid css selectors. Value of this object should be a function that returns an object with css attribute-value pairs. It can be also an object which keys are css attributes and value is specified as function that returns css value. Alternatively you can create an array of both.

e.g.

```
Template.hello.styles({
  'button': [
    function() {
      if (Session.get('counter') % 2 == 0) {
        return { color: 'red' };
      }
    },

    {
      fontSize: function() {
        return Session.get('counter') + 10 + 'px';
      }
    }
  ]
})
```

Attribute names and values will be passed to [jquery.css](http://api.jquery.com/css/#css-properties) method.