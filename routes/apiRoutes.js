const Workout = require("../models");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/api/workouts", async (req, res) => {

    try {
        
        const workoutCreateData = await Workout.create({});

        res.json(workoutCreateData);

    } catch (err) {

        console.log(err);
        
    }

});

router.put("/api/workouts/:id", async (req, res) => {
  
    try {

        const workoutUpdateData = await Workout.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { exercises: req.body } },
            { new: true }
          );

          res.json(workoutUpdateData);
        
    } catch (err) {
        
        res.json(err);

    }

});

router.get("/api/workouts/range", (req, res) => {

    try {

        const rangedWorkoutData = Workout.find({})
        .limit(7);

        res.json(rangedWorkoutData);
        
    } catch (err) {
      
        res.json(err);
        
    }

});

router.get("/api/workouts", (req, res) => {
  
    try {

        const allWorkoutData = Workout.find({});
       

        res.json(allWorkoutData);
        
    } catch (err) {
      
        res.json(err);
        
    }
});

module.exports = router;