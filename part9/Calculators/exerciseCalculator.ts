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

const exerciseCalculator = (exercises: object, target: number): exercise => {
  const periodLength = Object.keys(exercises).length;

  const trainingHours = Object.values(exercises).flatMap((hours) => {
    if (hours <= 0) return [];
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
      case totalAVG >= targetValue:
        return {
          desc: "You are doing great",
          success: true,
          rating: 2,
        };
      default:
        return {
          desc: "keep going",
          success: false,
          rating: 3,
        };
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

export default exerciseCalculator;
