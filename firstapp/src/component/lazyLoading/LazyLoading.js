import React, { useState, lazy, Suspense } from "react";
// import Child from "./Child";
const Child = lazy(() => import("./Child.js"));

export default function LazyLoading() {
  const [load, setLoad] = useState();
  return (
    <>
      <div>Lazy Loading</div>
      <button onClick={setLoad(true)}>Load User Data</button>
      {load ? (
        <Suspense fallback={<h3>Loading...</h3>}>
          <Child />
        </Suspense>
      ) : null}
    </>
  );
}
