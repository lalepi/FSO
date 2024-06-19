import { useState, useEffect } from "react";
import { Diary } from "./types";
import { getAllDiaries, createDiary } from "./services/diaryService";
import Notification from "./components/Notification";
import { useSelector } from "react-redux";
import {
  WeatherButtons,
  VisibilityButtons,
} from "./components/RadioButtonFrames";
import Content from "./components/Content";

import { IRootState } from "./store";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDate, setNewDate] = useState("");
  const [newComment, setNewComment] = useState("");
  const [Message, setMessage] = useState("");

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const weatherCondition = useSelector((state: IRootState) => state.weather);

  const visibilityCondition = useSelector(
    (state: IRootState) => state.visibility
  );
  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiary({
      date: newDate,
      visibility: visibilityCondition.status,
      weather: weatherCondition.status,
      comment: newComment,
    })
      .then((data) => {
        setDiaries(diaries.concat(data));
      })
      .catch((error) => {
        {
          setMessage(error.response.data);
          setTimeout(() => {
            setMessage("");
          }, 5000);
        }
      });

    setNewDate("");
    setNewComment("");
  };

  return (
    <div>
      <h3>Add new entry</h3>
      <Notification message={Message} />
      <form onSubmit={diaryCreation}>
        <div>
          date:{" "}
          <input
            type="date"
            value={newDate}
            min="2024-01-01"
            max="2054-12-31"
            onChange={(event) => setNewDate(event.target.value)}
          />
        </div>
        <WeatherButtons />
        <VisibilityButtons />
        <div>
          comment:{" "}
          <input
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
        </div>

        <button type="submit">add</button>
      </form>
      <Content diaries={diaries} />
    </div>
  );
};
export default App;
