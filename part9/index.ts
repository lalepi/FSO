/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from "express";
import BmiCalculator from "./bmiCalculator";
import exerciseCalculator from "./exerciseCalculator";

const app = express();
app.use(express.json());
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  res.json(BmiCalculator(Number(height), Number(weight)));
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const exercises = Object(req.body.daily_exercises);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target = Number(req.body.target);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!req.body.daily_exercises || !req.body.target) {
    return res.status(400).json({
      error: "parameters missing",
    });
  }
  if (isNaN(req.body.target)) {
    return res.status(400).json({
      error: "parameters missingol",
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
  const result = exerciseCalculator(exercises, target);

  console.log("result", result);

  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
