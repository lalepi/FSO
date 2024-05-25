import { CoursePart } from "../src/types";

const Part = ({ part }: {part: CoursePart}) => {

    const assertNever = (value: never): never => {
  
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
      );
    };
  
      switch (part.kind){
        case "basic":
          return (
            <i>
              {part.description}
            </i>
          )
        case "group":
          return (
            <div>
             project exercises: {part.groupProjectCount}
            </div>
          )
  
        case "background":
          return (
            <div>
             <i> {part.description}</i> 
             <div>
             Submit to: {part.backgroundMaterial}
             </div>
          
            </div>
          )
          case "special":
            return (
              <div>
              <i> {part.description}</i>  {part.requirements}
              <div>
             required skills:  {part.requirements.join(", ")}
             </div>
              </div>
            )
        default:
          return assertNever(part);
      }
      
    }

    export default Part