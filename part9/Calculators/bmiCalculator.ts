const BmiCalculator = (inputHeight: number, inputWeight: number) => {
  interface bmiData {
    height: number;
    weight: number;
  }

  const handleQuery = (inputHeight: number, inputWeight: number): bmiData => {
    if (!isNaN(Number(inputHeight)) && !isNaN(Number(inputWeight))) {
      return {
        height: Number(inputHeight),
        weight: Number(inputWeight),
      };
    } else {
      throw new Error("Provided values were not numbers!");
    }
  };

  const calculateBmi = (height: number, weight: number) => {
    const bmi = Math.round(weight / (height / 100) ** 2);

    switch (true) {
      case bmi <= 25:
        return {
          weight: weight,
          height: height,
          bmi: "Normal (healthy weight)",
        };
      case bmi > 25 && bmi <= 29:
        return {
          weight: weight,
          height: height,
          bmi: "Overweight (Pre-obese weight)",
        };
      case bmi >= 30:
        return {
          weight: weight,
          height: height,
          bmi: "Obese (not healthy weight)",
        };
      default:
        throw new Error("something went wrong");
    }
  };

  try {
    const { height, weight } = handleQuery(inputHeight, inputWeight);
    return calculateBmi(height, weight);
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
    return { errorMessage };
  }
};

export default BmiCalculator;
