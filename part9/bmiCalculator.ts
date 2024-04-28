interface bmiData {
  height: number;
  weight: number;
}

const handleValues = (args: string[]): bmiData => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number) => {
  const bmi = Math.round(weight / (height / 100) ** 2);

  switch (true) {
    case bmi <= 25:
      return "Normal (healthy weight)";
    case bmi > 25 && bmi <= 29:
      return "Overweight (Pre-obese weight)";
    case bmi >= 30:
      return "Obese (not healthy weight)";
    default:
      throw new Error("something went wrong");
  }
};

try {
  const { height, weight } = handleValues(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
