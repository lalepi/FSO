import { RadioButtonGroupProps, RenderOptionsProps } from "../../types";
import RadioButton from "./RadioButton";

const RenderOptions = ({ options, name, onChange }: RenderOptionsProps) => {
  return (
    <>
      <RadioButton
        value={options}
        label={options}
        name={name}
        onChange={onChange}
      />
    </>
  );
};

export const RadioButtonWeather = ({
  label,
  options,
  onChange,
}: RadioButtonGroupProps) => (
  <div>
    <div>{label}</div>
    <RenderOptions
      options={options[0].label}
      name={options[0].name}
      onChange={onChange}
    />
    <RenderOptions
      options={options[1].label}
      name={options[1].name}
      onChange={onChange}
    />
    <RenderOptions
      options={options[2].label}
      name={options[2].name}
      onChange={onChange}
    />
    <RenderOptions
      options={options[3].label}
      name={options[3].name}
      onChange={onChange}
    />
    <RenderOptions
      options={options[4].label}
      name={options[4].name}
      onChange={onChange}
    />
  </div>
);

export const RadioButtonVisibility = ({
  label,
  options,
  onChange,
}: RadioButtonGroupProps) => (
  <div>
    <div>{label}</div>
    <RenderOptions
      options={options[0].label}
      name={options[0].name}
      onChange={onChange}
    />
    <RenderOptions
      options={options[1].label}
      name={options[1].name}
      onChange={onChange}
    />
    <RenderOptions
      options={options[2].label}
      name={options[2].name}
      onChange={onChange}
    />
    <RenderOptions
      options={options[3].label}
      name={options[3].name}
      onChange={onChange}
    />
  </div>
);
