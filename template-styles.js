Template.prototype.styles = function(def) {
  this.hooks({
    rendered: function(instance) {
      var atts = {};
      _.each(def, function(_, selector) {
        atts[selector] = {};
      });

      _.each(def, function(value, selector) {
        this.autorun(function() {
          var style = value();
          var removed = _.difference(_.keys(atts[selector]), _.keys(style));

          var cssAtts = _.extend(style, _.reduce(removed, function(atts, attr) {
            atts[attr] = '';
            return atts;
          }, {}));

          this.$(selector).css(cssAtts);

          atts[selector] = style;
        }.bind(this));
      }, this);
    }
  });
};