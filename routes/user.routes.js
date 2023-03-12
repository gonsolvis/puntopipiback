const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Toilet = require("../models/Toilet.model");
const { isAdmin } = require("../middleware/admin.middleware");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
// const { sameUser } = require("../middleware/sameUser.middleware");


router.get("/profile/:idProfile",  (req, res, next) => {
    const { idProfile } = req.params;

    User.findById(idProfile)
    .populate("toilets")
     .then(response => {
        res.json({resultado: "ok"});
    })
    .catch(err => next(err))
});



// router.get("/profile", (req, res, next) => {
//     User.findById(req.user.id)
//       .populate("toilets")
//       .then(user => {
//         res.json({ user });
//       })
//       .catch(err => next(err));
//   });


module.exports = router;
