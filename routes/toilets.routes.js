const router = require("express").Router();
const Toilet = require("../models/Toilet.model");

//posts/
router.get("/", (req, res, next) => {
    Toilet.find()
    .populate("title")
    .then(response => {
        res.json(response);
    })
    .catch(err => next(err))
});

// /posts/new
router.post("/new", (req, res, next) => {
    const { title, description } = req.body;
    Toilet.create({ title, description })
    .then(response => {
        res.json({resultado: "ok"});
    })
    .catch(err => next(err))
});


router.put("/edit/:idToilet", (req, res, next) => {
    const { idToilet } = req.params;
    const { title, description } = req.body;

    // Project.updateOne({_id: idProject}, {title, description}, {new: true})
    Toilet.findByIdAndUpdate(idToilet, {title, description}, {new: true})
    .then(result => {
        res.json(result);
    })
    .catch(err => next(err))
});



router.get("/:idToilet", (req, res, next) => {
    const {idToilet} = req.params;
    Project.findById(idToilet)
    .populate("title")
    .then(result => {
        console.log("RESULT: ", result);
        res.json(result);
    })
    .catch(err => next(err))
});

router.delete("/delete/:idToilet", (req, res, next) => {
    const {idToilet} = req.params;
    Project.findByIdAndDelete(idToilet)
    .then(response => {
        res.json({resultado: "ok"});
    })
    .catch(err => next(err))
});






module.exports = router;