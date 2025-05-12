import React, { useContext } from "react";
import MyContext from "../utils/MyContext";

const Child = () => {
  const { user, count, setUser, setCount } = useContext(MyContext);
  return (
    <>
      <div>
        child component : user-{user} count: {count}
      </div>
      <button
        onClick={() => {
          setCount(0);
          setUser("abc");
        }}
      >
        change to default user
      </button>
    </>
  );
};

export default Child;
