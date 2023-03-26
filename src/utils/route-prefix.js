module.exports = (app, prefix) => {
  // Middleware that adds the prefix to the beginning of the route path
  app.use((req, res, next) => {
    req.url = prefix + req.url;
    next();
  });
};
