const sameUser = (req, res, next) => {
  if (req.payload._id === req.body.creator._id) {
    next();
  } else {
    res.redirect("/profile");
  }
};

module.exports = {
  sameUser,
};