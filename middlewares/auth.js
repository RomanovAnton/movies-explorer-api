module.exports = (req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };
  next();
};
