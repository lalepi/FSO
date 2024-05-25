import { CoursePart } from "../src/types"
import Part from "../components/Part";

const Content = ({ courses }: {courses: CoursePart []}) => {

    return(
      <div>
        
        {courses.map((course, index) => (
          <div key= {index}>
            <div>
            <b>
              {course.name} {course.exerciseCount}
              </b> 
             </div>
             <Part part={course} />

          </div>
        ))}
      </div>
    )
  }

export default Content