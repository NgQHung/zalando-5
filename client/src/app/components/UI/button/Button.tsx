import React from "react";
import { useAppSelector } from "../../../hooks";

interface IProps {
  children: JSX.Element;
  className: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ButtonPrimary = ({ children, className, onClick, ...props }: IProps) => {
  const disabled = useAppSelector((state) => state.UISlice.disabled);
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`text-[16px] relative w-full leading-[24px] tracking-[-0.16px] whitespace-nowrap font-[700] text-ellipsis hover:opacity-80 p-3 transition-all text-[#ffff] text-center cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
