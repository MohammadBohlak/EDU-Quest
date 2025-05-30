import React, { useState } from "react";
import { Knob, SwitchWrapper } from "./themSwitch.styles";
import { toggleTheme } from "../../store/slices/themeSlice";
import { useDispatch, useSelector } from "react-redux";


const ThemeSwitch = () => {
  const [active, setActive] = useState(false);  
  const theme = useSelector(state => state.theme)
  const dispatch = useDispatch() ; 
  const switchTheme = () => {
    setActive(!active)
    dispatch(toggleTheme())
  }
  return (
    <SwitchWrapper $active={active} onClick={switchTheme}>
      <Knob $active={active} />
    </SwitchWrapper>
  );
};

export default ThemeSwitch;
