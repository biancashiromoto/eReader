import ButtonProps from "../../interfaces/Interfaces";

const Button: React.FC<ButtonProps> = ({name, onClick, label}) => {
  return (
    <button
      type="button"
      name={name}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button;