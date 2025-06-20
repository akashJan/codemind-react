import React from "react";
import WithAuth from "./WithAuth";
import Dashboard from "./Dashboard";

export default function HigherOrderCom() {
  const AuthDash = WithAuth(Dashboard);
  return (
    <div>
      <AuthDash />
    </div>
  );
}

// Write this code in App.js it will work
