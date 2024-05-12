
interface HeaderProps {
  name: string;
}

interface CoursePart {
  name: string;
  exerciseCount: number;
}

type Courses = CoursePart []

const Header = (props: HeaderProps) => {
const header = props.name
  return(
    <div>
<h1>{header}</h1>
    </div>
  )
}

const Content = (props: Courses) => {
  const courseParts = Object.values(props)
    
    return (
        <div>
        {courseParts.map((course) => 
              <p key = {course.name}>
              {course.name} {course.exerciseCount}
              </p>
        )}
        </div>
)}

const Total = (props: Courses) => {
  
  const parts = Object.values(props)
  const totalExercises = parts.reduce((sum, part) => sum + part.exerciseCount, 0);

return(
<div>
    <p>
    Number of exercises {totalExercises}
    </p>
</div>
)

}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content {...courseParts} />
      <Total {...courseParts} />
    </div>
  );
};

export default App;