import React, { useState } from "react";
import "./ToggleSwitch.css";

function ToggleSwitch() {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => setIsOn(!isOn);

  return (
    <div onClick={toggleSwitch} className={`toggle-switch ${isOn ? "on" : ""}`}>
      <div className="toggle-switch-knob"></div>
    </div>
  );
}

export default ToggleSwitch;
