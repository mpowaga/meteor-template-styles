Template.prototype.styles = function(def) {
  this.hooks({
    rendered: function(instance) {
      var atts = {};
      _.each(def, function(value, selector) {
        atts[selector] = {};
      });

      _.each(def, function(value, selector) {
        if (typeof value == 'function') {
          this.autorun(function() {
            var style = value();
            if (! _.isObject(style)) {
              style = {};
            }

            var removed = _.difference(_.keys(atts[selector]), _.keys(style));

            var cssAtts = _.extend(style, _.reduce(removed, function(atts, attr) {
              atts[attr] = '';
              return atts;
            }, {}));

            this.$(selector).css(cssAtts);

            atts[selector] = style;
          }.bind(this));
        } else {
          _.each(value, function(attribute, key) {
            this.autorun(function() {
              var style = attribute();
              if (! style) {
                style = '';
              }

              this.$(selector).css(key, style);
            }.bind(this));
          }, this);
        }
      }, this);
    },
  });
};