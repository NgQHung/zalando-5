import React from "react";

interface IProps {
  children: React.ReactNode;
  bg_color: string;
  margin?: string;
}

const Container: React.FC<IProps> = ({ children, bg_color, margin }) => {
  return (
    <div className={`w-full relative transition-all ${bg_color} ${margin}`}>
      <div className="lg:max-w-[1216px] flex justify-between items-center mx-auto my-0">{children}</div>
    </div>
  );
};

export default Container;
