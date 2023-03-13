const router = require("express").Router();
const Toilet = require("../models/Toilet.model");
const Comment = require("../models/Comment.model");
// const fileUploader = require("../config/cloudinary.config");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const { isAdmin } = require("../middleware/admin.middleware.js");



router.get("/:idToilet", (req, res, next) => {
    const { idToilet } = req.params;
    Toilet.findById(idToilet)
    .populate("comments")
    .then(response => {
        res.json(response);
    })
    .catch(err => next(err))
});

//HOW TO POPULATE, THE ID?
router.post("/new",  (req, res, next) => {
    const { content, imageUrl, creator, toilet } = req.body;
    Comment.create({ content, imageUrl, creator, toilet })
    .then(response => {
       return Toilet.findByIdAndUpdate(toilet, { $push: {comments: response} }, {new: true})
    })
    .then((data)=>{
        res.json({resultado: "ok"});
    })
    .catch(err => next(err))
});


// router.post("/new/:idToilet",  (req, res, next) => {
//     const { idToilet } = req.params;
//     Toilet.findById(idToilet)
//     .then ((data) =>{})
//     const { content, imageUrl, creator, toilet } = req.body;
//     Comment.create({ content, imageUrl, creator, toilet })
//     .then(response => {
//         res.json({resultado: "ok"});
//     })
//     .catch(err => next(err))
// });

router.delete("/delete/:idComment", (req, res, next) => {
    const {idComment} = req.params;
    Comment.findByIdAndDelete(idComment)
    .then(response => {
        res.json({resultado: "ok"});
    })
    .catch(err => next(err))
});




// router.post("/", (req, res, next) => {
//     const { content, imageUrl } = req.body;
//     Toilet.create({ content, imageUrl })
//       .then((toilet) => {
//         return Toilet.findById(toilet._id).populate("creator");
//       })
//       .then((toilet) => {
//         res.json({ resultado: "ok" });
//       })
//       .catch((err) => next(err));
//   });

module.exports = router;
