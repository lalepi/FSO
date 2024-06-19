import { Diary } from "../types";
import SingleDiary from "./SingleDiary";

const Content = ({ diaries }: { diaries: Diary[] }) => {
  return (
    <div>
      <h3>Diary Entries:</h3>

      {diaries.map((diary) => (
        <div key={diary.id}>
          <div>
            <b>{diary.date.toString()}</b>
          </div>
          <SingleDiary diary={diary} />

          <div>----------------------------------</div>
        </div>
      ))}
    </div>
  );
};

export default Content;
