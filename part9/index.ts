/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from "express";
import BmiCalculator from "./bmiCalculator";
import exerciseCalculator from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  res.json(BmiCalculator(Number(height), Number(weight)));
});

app.post("/exercises", (req, res) => {
  if (!req.body.daily_exercises || !req.body.target) {
    return res.status(400).json({
      error: "parameters missing",
    });
  }
  if (
    !Array.isArray(req.body.daily_exercises) ||
    req.body.daily_exercises.some(isNaN) ||
    isNaN(req.body.target)
  ) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  const exercises = Object(req.body.daily_exercises);
  const target = Number(req.body.target);

  const result = exerciseCalculator(exercises, target);

  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
