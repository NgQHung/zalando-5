import React, { Fragment } from "react";

interface IProps {
  children: JSX.Element;
}

export const NoFooterHeaderLayout = ({ children }: IProps) => {
  return <Fragment>{children}</Fragment>;
};
