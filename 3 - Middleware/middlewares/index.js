module.exports = {
  middleware1: (req, res, next) => {
    req.message1 = "Functional Middleware 1 from another directory";
    next();
  },
  middleware2: (req, res, next) => {
    req.message2 = "Functional Middleware 2 from another directory";
    next();
  },
};
