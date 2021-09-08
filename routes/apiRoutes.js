const Workout = require("../models/workout.js");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/api/workouts", ({ body }, res) => {

  Workout.create(body).then((dbWorkout => {
      res.json(dbWorkout);
  })).catch(err => {
      res.json(err);
  });

});
  
router.put("/api/workouts/:id", (req, res) => {

    Workout.findOneAndUpdate(
        { _id: req.params.id },
        {
            $inc: { totalDuration: req.body.duration },
            $push: { exercises: req.body }
        },
        { new: true }).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });

});
  
  router.get("/api/workouts/range", (req, res) => {
    Workout.find({})
      .limit(7)
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
  router.get("/api/workouts", (req, res) => {

    Workout.find({}).then(dbWorkout => {

        dbWorkout.forEach(workout => {
            var total = 0;
            workout.exercises.forEach(e => {
                total += e.duration;
            });
            workout.totalDuration = total;

        });

        res.json(dbWorkout);
       }).catch((err) => {
        res.json(err);
      });
  });

module.exports = router;