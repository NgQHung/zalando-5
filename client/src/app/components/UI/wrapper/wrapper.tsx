import React from "react";

interface IProps {
  children: JSX.Element;
  className: string;
}

const Wrapper = ({ children, className, ...props }: IProps) => {
  return (
    <div className={`font-[14px] z-[100] transition-background ${className}`} {...props}>
      <div className="lg:max-w-[1216px] relative mx-6 xl:mx-auto lg:my-0 md:my-0 ">{children}</div>
    </div>
  );
};

export default Wrapper;
