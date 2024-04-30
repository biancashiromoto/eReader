import ButtonProps from "../../interfaces/Interfaces";
import style from "./Button.module.css";

const Button: React.FC<ButtonProps> = ({name, onClick, label, className, "data-testid": testId}) => {
  return (
    <button
      className={`${className} ${style["button"]}`}
      name={name}
      onClick={onClick}
      type="button"
      data-testid={testId}
    >
      {label}
    </button>
  )
}

export default Button;