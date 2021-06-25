const handlebars = require("handlebars");

module.exports = {
  ifFirst: function (index, options) {
    if (index == 0) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },
};
