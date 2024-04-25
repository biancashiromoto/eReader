import ButtonProps from "../../interfaces/Interfaces";

const Button: React.FC<ButtonProps> = ({name, onClick, label, className}) => {
  return (
    <button
      className={className}
      name={name}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  )
}

export default Button;