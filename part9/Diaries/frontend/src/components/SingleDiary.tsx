import { Diary } from "../types";

const SingleDiary = ({ diary }: { diary: Diary }) => {
  return (
    <div>
      <div>Visibility: {diary.visibility}</div>
      <div>Weather: {diary.weather}</div>
      <div>Comment: {diary.comment}</div>
    </div>
  );
};

export default SingleDiary;
