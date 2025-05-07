import React, { useRef } from "react";

const RefHook = () => {
  const inputRef = useRef();

  const handleClick = () => {
    console.log(inputRef);
    inputRef.current.focus();
    inputRef.current.value = "test";
  };
  return (
    <>
      <div>UseRef hook</div>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>start typing...</button>
    </>
  );
};

export default RefHook;
