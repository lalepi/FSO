interface exercise {
  training: {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    averageTime: number;
    rating: number;
    ratingDescription: string;
    target: number;
  };
}

const parseArguments = (args: string[]): exercise => {
  const input = process.argv.slice(3, process.argv.length).map(Number);
  const periodLength = input.length;

  const trainingHours = input.flatMap((hours) => {
    if (hours <= 0) return [];
    if (isNaN(Number(hours)))
      throw new Error("Provided values were not numbers!");
    else return hours;
  });
  const trainingDays = trainingHours.length;

  const total = trainingHours.reduce((acc, hour) => acc + hour);
  const totalAVG = total / trainingHours.length;

  const targetValue = Number(args[2]);

  const rating = () => {
    switch (true) {
      case totalAVG > targetValue * 1.5:
        return {
          desc: "Fantastic",
          success: true,
          rating: 1,
        };

      case totalAVG > targetValue:
        return {
          desc: "You are doing great",
          success: true,
          rating: 2,
        };
      case totalAVG < targetValue:
        return {
          desc: "keep going",
          success: false,
          rating: 3,
        };
      default:
        throw new Error("something went wrong");
    }
  };
  const verdict = rating();

  const training = {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: verdict.success,
    rating: verdict.rating,
    ratingDescription: verdict.desc,
    target: targetValue,
    averageTime: totalAVG,
  };

  return { training };
};

const exerciseCalculator = (training: object, printText: string) => {
  console.log(printText, training);
};

try {
  const { training } = parseArguments(process.argv);
  exerciseCalculator(training, `the result is:`);
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
