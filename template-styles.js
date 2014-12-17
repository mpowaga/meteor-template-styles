Template.prototype.styles = function(def) {
  this.hooks({
    rendered: function(instance) {
      var atts = {};
      _.each(def, function(_, selector) {
        atts[selector] = {};
      });

      this.autorun(function() {
        _.each(def, function(value, selector) {
          var style = value();
          var removed = _.difference(_.keys(atts[selector]), _.keys(style));

          var cssAtts = _.extend(style, _.reduce(removed, function(atts, attr) {
            atts[attr] = '';
            return atts;
          }, {}));

          this.$(selector).css(cssAtts);

          atts[selector] = style;
        }, this);
      }.bind(this));
    }
  });
};