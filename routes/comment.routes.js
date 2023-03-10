const router = require("express").Router();
const Toilet = require("../models/Toilet.model");
const Comment = require("../models/Comment.model");
// const fileUploader = require("../config/cloudinary.config");




router.get("/", (req, res, next) => {
    Comment.find()
    .populate("creator")
    .then(response => {
        res.json(response);
    })
    .catch(err => next(err))
});

//HOW TO POPULATE, THE ID?
router.post("/new", (req, res, next) => {
    const { content, imageUrl, creator, toilet } = req.body;
    Comment.create({ content, imageUrl, creator, toilet })
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
