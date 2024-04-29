import ButtonProps from "../../interfaces/Interfaces";

const Button: React.FC<ButtonProps> = ({name, onClick, label, className, "data-testid": testId}) => {
  return (
    <button
      className={className}
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