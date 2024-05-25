import { CoursePart } from "../src/types";

const Total = (props: CoursePart []) => {
  
    const parts = Object.values(props)
    const totalExercises = parts.reduce((sum, part) => sum + part.exerciseCount, 0);
  
  return(
  <div>
      <p>
      Number of exercises: {totalExercises}
      </p>
  </div>
  )
  
  }

export default Total