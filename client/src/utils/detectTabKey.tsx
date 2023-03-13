import React from "react";
import { useAppDispatch } from "../app/hooks";
import { UIActions } from "../stores/UI-slice";

//   console.log("he lo so li li");
export const DetectTabKey = (e: React.KeyboardEvent<HTMLElement>) => {
  const dispatch = useAppDispatch();

  if (e.key === "Tab") {
    // get access to form
    const form = (e.target as HTMLButtonElement).form;
    // get the index of the current field of input
    const index = Array.prototype.indexOf.call(form, e.target);
    // get the next field of input
    const next = form?.elements[index + 1] as HTMLButtonElement;
    dispatch(UIActions.inputTabKey(next.name));
    // console.log(next.name);
    // return next;
  }
};
//   return onKeyDown;
