const exerciseCalculator = (exercises: object, target: number) => {
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

  const parseArguments = (exercises: object, target: number): exercise => {
    const periodLength = Object.keys(exercises).length;

    const trainingHours = Object.values(exercises).flatMap((hours) => {
      if (hours <= 0) return [];
      if (isNaN(Number(hours)))
        throw new Error("Provided values were not numbers!");
      else return Number(hours);
    });

    const trainingDays = trainingHours.length;

    const total = trainingHours.reduce((acc, hour) => acc + hour);
    const totalAVG = total / trainingHours.length;

    const targetValue = Number(target);

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
          throw new Error("parameters missing");
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

  try {
    const { training } = parseArguments(exercises, target);
    return training;
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    return errorMessage;
  }
};

export default exerciseCalculator;
