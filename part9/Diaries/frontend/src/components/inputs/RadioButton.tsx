import { InputElementProps } from "../../types";

const RadioButton = ({
  label,
  disabled = false,
  ...rest
}: InputElementProps) => (
  <>
    <label htmlFor={label}>{label}</label>
    <input id={label} type="radio" disabled={disabled} {...rest} />
  </>
);

export default RadioButton;
