const router = require("express").Router();
const Workout = require("../models/workout.js")
const path = require("path")

//HTML Routes
router.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

router.get("/exercise", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"))
})

router.get("/stats", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"))
})

//api.js routes
router.get("/api/workouts", (req, res) => {
    Workout.find({})
      .sort({ date: -1 })
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
})


module.exports = router;




