// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const WorkoutSchema = new Schema({
//   day: {
//     type: Date,
//     default: Date.now
//   },
//   exercises: [
//     {
//       type: {
//         type: String,
//         trim: true,
//       },
//       name: {
//         type: String,
//         trim: true,
//       },
//       duration: Number,
//       weight: {
//         type: Number,
//         default: 0
//       },
//       reps: {
//         type: Number,
//         default: 0
//       },
//       sets: {
//         type: Number,
//         default: 0
//       },
//       distance: {
//         type: Number,
//         default: 0
//       }
//     }
//   ],
//   totalDuration: {
//     type: Number,
//     default: 0,
//   }

// });

// const Workout = mongoose.model("Workout", WorkoutSchema);

// module.exports = Workout;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
  {
    day: { type: Date, default: () => new Date() },
    exercises: [
      {
        type: {
          type: String,
        },
        name: {
          type: String,
        },
        duration: {
          type: Number,
        },
        weight: Number,
        reps: Number,
        sets: Number,
        distance: Number,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

WorkoutSchema.virtual("totalDuration").get(function () {
  const duration = this.exercises.reduce((acc, cur) => {
    return acc + cur.duration;
  }, 0);

  return duration;
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;