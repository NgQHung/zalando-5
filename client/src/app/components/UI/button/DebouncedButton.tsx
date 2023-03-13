import React, { useEffect, useState } from "react";

interface IProps {
  children: JSX.Element;
  className: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  as: any;
  button: any;
}

const DebouncedButton = () =>
  // { as = button, delay, onClick, ...props }:IProps
  {
    // const [isDisabled, setDisabled] = useState(false);
    // useEffect(() => {
    //   if (!isDisabled) {
    //     // timeout elapsed, nothing to do
    //     return;
    //   }
    //   // isDisabled was changed to true, set back to false after `delay`
    //   const handle = setTimeout(() => {
    //     setDisabled(false);
    //   }, delay);
    //   return () => clearTimeout(handle);
    // }, [isDisabled, delay]);
    // const handleClick = (e) => {
    //   if (isDisabled) {
    //     return;
    //   }
    //   setDisabled(true);
    //   return onClick(e);
    // };
    // const Component = as;
    // return <Component {...props} disabled={isDisabled} onClick={handleClick} />;
  };

export default DebouncedButton;
