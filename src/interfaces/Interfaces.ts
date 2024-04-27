import { MouseEventHandler } from "react";

export default interface ButtonProps {
  className?: string;
  label?: string;
  name?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  "data-testid"?: string;
  role?: string;
}