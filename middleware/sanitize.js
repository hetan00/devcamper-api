const sanitizeHtml = require('sanitize-html');

const sanitizeInput = (req, res, next) => {
  // Sanitize all string fields in req.body
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeHtml(req.body[key], {
          allowedTags: [],        // remove all HTML tags
          allowedAttributes: {},  // remove all attributes
        });
      }
    }
  }
  next();
};

  module.exports = sanitizeInput;