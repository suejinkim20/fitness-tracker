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

router.get("/api/workouts", (req, res) => {
    Workout.find({}
    //     , (error, data) => {
    //     if (error) {
    //         res.send(error)
    //     } else {
    //         res.json(data)
    //     }
    // }
    )
      .sort({ date: -1 })
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
});


router.post("/api/workouts", ({body}, res) => {
    Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.status(400).json(err);
        })

})

{ //Do i even need this route since i ran npm run seed through seeds.js?
// router.post("/api/workout/bulk", ({ body }, res) => {
//     workout.insertMany(body)
//       .then(dbWorkout => {
//         res.json(dbWorkout);
//       })
//       .catch(err => {
//         res.status(400).json(err);
//       });
// });
}



module.exports = router;




