import { useState, useEffect } from "react";
import { Weather, Visibility, WeatherProps } from "../types";
import { useDispatch } from "react-redux";
import { VisibilityButtonChange } from "../reducers/visibilityButtonReducer";
import { WeatherButtonChange } from "../reducers/weatherButtonReducer";
import {
  RadioButtonVisibility,
  RadioButtonWeather,
} from "../components/inputs/RadioButtonGroup";

export const WeatherButtons = () => {
  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  const dispatch = useDispatch();

  const visibility = Object.values(Weather);

  let data: Array<WeatherProps> = [];
  visibility.forEach(
    (v, i) =>
      (data = [...data, { label: visibility[i], name: "Weather-buttons" }])
  );

  const [selectedValue, setSelectedValue] = useState<string>(data[0].label);

  useEffect(() => {
    dispatch(WeatherButtonChange(selectedValue));
  }, [dispatch, selectedValue]);

  return (
    <div>
      <RadioButtonWeather
        label="Weather:"
        options={data}
        onChange={radioHandler}
      />
    </div>
  );
};

export const VisibilityButtons = () => {
  const dispatch = useDispatch();
  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const weather = Object.values(Visibility);
  let data: Array<WeatherProps> = [];

  weather.forEach(
    (v, i) =>
      (data = [...data, { label: weather[i], name: "Visibility-buttons" }])
  );

  const [selectedValue, setSelectedValue] = useState<string>(data[0].label);

  useEffect(() => {
    dispatch(VisibilityButtonChange(selectedValue));
  }, [dispatch, selectedValue]);

  return (
    <div>
      <RadioButtonVisibility
        label="Visibility:"
        options={data}
        onChange={radioHandler}
      />
    </div>
  );
};
