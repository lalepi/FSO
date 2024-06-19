import { InputHTMLAttributes } from "react";
export interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export interface WeatherProps {
  name: string;
  label: string;
}

export interface DataStructure {
  data: [];
  value: string;
  onChange: void;
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export type NewDiary = Omit<Diary, "id">;

export interface NotificationMessage {
  message: string;
}

export interface InputElementProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  disabled?: boolean;
}

export interface IOption {
  label: string;
  name?: string;
  disabled?: boolean;
}

export interface IOptionGroup {
  label: string;
  options: IOption[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface RenderOptionsProps {
  options: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface RadioButtonGroupProps extends IOptionGroup {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
