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
    var counter = Session.get('counter');
    if (counter % 2 == 0) {
      return { color: 'red' };
    }
  },

  'button': {
    fontSize: function() {
      return (Session.get('counter') + 10) + 'px';
    }
  }
});

Template.hello.events({
  'click button': function() {
    Session.set('counter', Session.get('counter') + 1);
  }
})
```

##Details##

`styles` function takes an object which keys are valid css selectors. Value of this object must be a function that returns an object with css attribute-value pairs. Alternatively it can be object which keys are css attributes and value is specified as function that returns css value. Attribute names and values will be passed to [jquery.css](http://api.jquery.com/css/#css-properties) method.