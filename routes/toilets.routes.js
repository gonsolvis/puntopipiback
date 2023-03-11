const router = require("express").Router();
const Toilet = require("../models/Toilet.model");
const Comment = require("../models/Comment.model");
const fileUploader = require("../config/cloudinary.config");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const { isAdmin } = require("../middleware/admin.middleware");
// const { sameUser } = require("../middleware/sameUser.middleware");
//posts/
router.get("/", (req, res, next) => {
    Toilet.find()
    .populate("creator")
    .then(response => {
        res.json(response);
    })
    .catch(err => next(err))
});

// /posts/new
router.post("/new", (req, res, next) => {
    const { title, description, rating, imageUrl } = req.body;
    Toilet.create({ title, description, rating, imageUrl })
    .then(response => {
        res.json({resultado: "ok"});
    })
    .catch(err => next(err))
});

// // POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
// router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
//     // console.log("file is: ", req.file)
//        if (!req.file) {
//       next(new Error("No file uploaded!"));
//       return;
//     }
//         // Get the URL of the uploaded file and send it as a response.
//     // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
    
//     res.json({ fileUrl: req.file.path });
//   });


// router.post("/new", isAuthenticated, fileUploader.single("imageUrl"), (req, res, next) => {
//     const { title, description, rating } = req.body;
    
//     // Extract the image URL from the req.file object
//     const imageUrl = req.file.secure_url;
  
//     Toilet.create({ title, description, rating, imageUrl })
//       .then(response => {
//         res.json({ resultado: "ok" });
//       })
//       .catch(err => next(err))
//   });


router.get("/:idToilet", (req, res, next) => {
    const { idToilet } = req.params;
  
    Toilet.findById(idToilet)
      .populate("creator")
      .populate("comments")
      .populate({
        path: "comments",
        populate: {
          path: "creator",
          model: "User",
        },
      })
      .then(result => {
        if (!result) {
          return res.status(404).json({ message: "Toilet not found" });
        }
        res.json(result);
      })
      .catch(err => next(err));
  });


router.put("/edit/:idToilet", isAdmin, (req, res, next) => {
    const { idToilet } = req.params;
    const { title, description, rating, imageUrl } = req.body;

    // Project.updateOne({_id: idProject}, {title, description}, {new: true})
    Toilet.findByIdAndUpdate(idToilet, {title, description, rating, imageUrl}, {new: true})
    .then(result => {
        res.json(result);
    })
    .catch(err => next(err))
});


router.delete("/delete/:idToilet", isAdmin, (req, res, next) => {
    const {idToilet} = req.params;
    Toilet.findByIdAndDelete(idToilet)
    .then(response => {
        res.json({resultado: "ok"});
    })
    .catch(err => next(err))
});






module.exports = router;