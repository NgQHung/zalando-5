import React from "react";

interface IProps {
  children: JSX.Element;
  className: string;
}

const WrapperRowFull = ({ children, className, ...props }: IProps) => {
  return (
    <div
      className={`relative w-screen ml-[calc(-50vw+50%-8.5px)] mb-[64px] overflow-x-auto scrollbar_hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default WrapperRowFull;
