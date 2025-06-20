import React from "react";
import Dashboard from "./Dashboard";

export default function WithAuth(Component) {
  const isAuthenticate = false;
  return function (props) {
    if (isAuthenticate) {
      return <Component {...props} />;
    } else {
      return <div>Please Login</div>;
    }
  };
}

// It is working but right this code in app.js
// this not good way.
