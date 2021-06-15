const router = require("express").Router();
const Workout = require('../models/workout.js')

router.post("/api/workouts", ({body}, res) => {
    Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.status(400).json(err);
        })

})

router.post("/api/workout/bulk", ({ body }, res) => {
    workout.insertMany(body)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
});
  

router.get("/api/workouts", (req, res) => {
    Workout.find({}, (error, data) => {
        if (error) {
            res.send(error)
        } else {
            res.json(data)
        }
    })
    //   .sort({ date: -1 })
    //   .then(dbWorkout => {
    //     res.json(dbWorkout);
    //   })
    //   .catch(err => {
    //     res.status(400).json(err);
    //   });
});
  



module.exports = router;




