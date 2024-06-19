import axios from "axios";
import { Diary, NewDiary } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaries = () => {
  return axios.get<Diary[]>(baseUrl).then((response) => response.data);
};

export const createDiary = (object: NewDiary) => {
  return axios.post<Diary>(baseUrl, object).then((response) => response.data);

  // .catch((error) => {
  //   if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
  //     console.log("error.status", error.status);
  //     console.error("error.response", error.response.data);

  //     error.response;
  //   }
  // });

  // Do something with the response
};
