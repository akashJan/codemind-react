import React, { useState } from "react";

export default function ControlledCom() {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const value = e.targe.value;
  };
  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
    </div>
  );
}
