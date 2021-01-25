const dataMiddleware = (req, res, next) => {
  req.values = [];
  for (let clave in req.body) {
    if (req.body.hasOwnProperty(clave)) {
      req.values.push(req.body[clave]);
    }
  }
  if (req.values.length === 0) {
    res.send(req.body);
  } else {
    next();
  }
};

module.exports = {
  dataMiddleware,
};
