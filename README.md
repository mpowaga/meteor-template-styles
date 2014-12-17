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
    var style = {
      fontSize: (10 + counter) + 'px'
    };

    if (style % 2 == 0) {
      style.color = 'red';
    }

    return style;
  }
});

Template.hello.events({
  'click button': function() {
    Session.set('counter', Session.get('counter') + 1);
  }
})
```

##Details##

`styles` function takes an object which keys are valid css selectors and value is a function which returns object with css attributes accepted by [jquery.css](http://api.jquery.com/css/#css-properties) method.