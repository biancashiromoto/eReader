import { MouseEventHandler } from "react";

export default interface ButtonProps {
  name: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  label: string;
}