import React, { useState } from "react";

const Use_Input = (validateInput: (input: string) => boolean) => {
  const [input, setInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const inputIsValid = validateInput(input);
  const hasError = !inputIsValid;
  // && isTouched;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setInput("");
    setIsTouched(false);
  };

  return {
    onChangeHandler,
    input,
    inputBlurHandler,
    reset,
    isTouched,
    hasError,
    inputIsValid,
  };
};

export default Use_Input;
