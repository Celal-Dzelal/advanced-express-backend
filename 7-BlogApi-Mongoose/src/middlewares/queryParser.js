const qs = require("qs");
const url = require("url");

module.exports = (req, res, next) => {
  const parsed = url.parse(req.url);
  req.query = qs.parse(parsed.query);
  next();
  console.log(qs.parse(url.parse(req.url).query));
};
