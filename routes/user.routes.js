// const express = require("express");
// const router = express.Router();

/* GET home page */
router.get("/profile", isLoggedIn, (req, res, next) => {
    let myUserId = req.session.currentUser._id;
    console.log("**myuser id**=", myUserId);
    //console.log(req.session.currentUser);
    //console.log("All information from cookie", req.session.currentUser);
    User.findById(myUserId)
      .populate("posts")
      .populate({
        path: "posts",
        populate: {
          path: "comments",
          model: "Comment",
        },
      })
      .then((myUserdb) => {
        console.log("Here is my data", myUserdb);
        res.render("users/home", { post: myUserdb });
      })
  
      .catch((err) => next(err));
  });

// module.exports = router;
