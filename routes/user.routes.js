const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Toilet = require("../models/Toilet.model");
const { isAdmin } = require("../middleware/admin.middleware");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
// const { sameUser } = require("../middleware/sameUser.middleware");


router.get("/profile/:idProfile", isAuthenticated,  (req, res, next) => {
    const { idProfile } = req.params;

    User.findById(idProfile)
    .populate("toilets")
     .then(result => { 
        console.log(result)
        res.json(result);
    })
    .catch(err => next(err))
});



router.put("/profile/edit/:idProfile", isAuthenticated,  (req, res, next) => {
    const { idProfile } = req.params;
    const { email, name, imageUrl } = req.body;
    User.findByIdAndUpdate(idProfile, {email, name, imageUrl}, {new: true})
     .then(result => {
        res.json(result);
    })
    .catch(err => next(err))
});

router.delete("/profile/delete/:idToilet", isAdmin, (req, res, next) => {
    const {idProfile} = req.params;
    Toilet.findByIdAndDelete(idProfile)
    .then(response => {
        res.json({resultado: "ok"});
    })
    .catch(err => next(err))
});



module.exports = router;
