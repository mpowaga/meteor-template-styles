Template.prototype.styles = function(def) {
  this.hooks({
    rendered: function() {
      initStyles.apply(this, [def]);
    }
  });
};

function initStyles(def) {
  _.each(def, function(value, selector) {
    var values = _.isArray(value) ? value : [value];
    _.each(values, function(value) {
      cssFromValue(this, selector, value);
    }, this);
  }, this);
};

function cssFromValue(tmpl, selector, value) {
  if (_.isFunction(value)) {
    cssFromFunction(tmpl, selector, value);
  } else if (_.isObject(value)) {
    cssFromObject(tmpl, selector, value);
  } else {
    throw new Error('Object should be either function or string');
  }
}

function cssFromFunction(tmpl, selector, value) {
  var previous = {};
  tmpl.autorun(function() {
    var style = value() || {};
    var difference = _.difference(_.keys(previous), _.keys(style));
    var removed = _.reduce(difference, function(atts, attr) {
      atts[attr] = '';
      return atts;
    }, {});

    var atts = _.extend(style, removed);
    tmpl.$(selector).css(atts);

    previous = style;
  });
};

function cssFromObject(tmpl, selector, value) {
  _.each(value, function(value, attribute) {
    tmpl.autorun(function() {
      var style = value();
      tmpl.$(selector).css(attribute, style || '');
    });
  });
};