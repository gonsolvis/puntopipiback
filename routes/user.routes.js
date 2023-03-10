const express = require("express");
const router = express.Router();
// const User = require("../models/user.model");
const Toilet = require("../models/Toilet.model");


router.get("/profile", (req, res, next) => {
    Toilet.find()
    .populate("toilets")
    .then(response => {
        res.json({resultado: "ok"});
    })
    .catch(err => next(err))
});




// GET /user/profile - Retrieves the authenticated user's profile
// router.get("/profile", (req, res, next) => {
//     const userId = req.payload._id;
   
//     User.findById(userId)
//       .populate("toilets")
//       .then((foundUser) => {
//         if (!foundUser) {
//           res.status(404).json({ message: "User not found." });
//           return;
//         }
  
//           const { _id, email, name, toilets } = foundUser;
  
//         const userToilets = toilets.filter((toilet) => toilet.owner.toString() === userId);
  
//          const userProfile = { _id, email, name, toilets: userToilets };
  
//         res.status(200).json({ user: userProfile });
//       })
//       .catch((err) => next(err)); 
//   });
  



// module.exports = router;
