const router = require("express").Router();
const Toilet = require("../models/Toilet.model");
const Comment = require("../models/Comment.model");
// const fileUploader = require("../config/cloudinary.config");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const { isAdmin } = require("../middleware/admin.middleware.js");

// / ********* require fileUploader in order to use it *********/
const fileUploader = require("../config/cloudinary.config");



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


// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
    // console.log("file is: ", req.file)
   
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    
    // Get the URL of the uploaded file and send it as a response.
    // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
    
    res.json({ fileUrl: req.file.path });
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
