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
     .then(result => {
        res.json({result});
    })
    .catch(err => next(err))
});



router.put("/profile/edit/:idProfile",  (req, res, next) => {
    const { idProfile } = req.params;
    const { email, name } = req.body;
    User.findByIdAndUpdate(idProfile, {email, name}, {new: true})
     .then(result => {
        res.json({result});
    })
    .catch(err => next(err))
});


module.exports = router;
