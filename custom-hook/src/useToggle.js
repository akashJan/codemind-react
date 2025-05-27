import { useState } from "react";

const useToggle = (defaultvalue) => {
  const [value, setValue] = useState(defaultvalue);

  function toggleValue(val) {
    if (typeof val !== "boolean") {
      setValue(!value);
    } else {
      setValue(val);
    }
  }
  return [value, toggleValue];
};

export default useToggle;
