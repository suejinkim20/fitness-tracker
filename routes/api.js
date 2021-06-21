const router = require("express").Router();
const Workout = require("../models/workout.js")
const path = require("path");
const { db } = require("../models/workout.js");

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
    Workout.aggregate([
        {
            $limit : 7
        },
        {
            $addFields: {
                totalDuration: {$sum: '$exercises.duration'}
            }
        }
    ])
      .then(dbWorkout => {        
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
})

router.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
      .then(dbWorkout => {
          res.json(dbWorkout)
      })
      .catch(err => {
          res.status(400).json(err)
      })
})

router.put("/api/workouts/:id", (req, res) => {
    Workout.updateOne(
      {
        _id: req.params.id
      },
      {
        $push: { exercises: req.body }
      },
      (error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      }
    );
  });
  
module.exports = router;




