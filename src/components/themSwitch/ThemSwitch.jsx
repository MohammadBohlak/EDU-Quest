import React, { useState } from "react";
import { Knob, SwitchWrapper } from "./themSwitch.styles";
import { setTheme, toggleTheme } from "../../store/slices/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../utils/api/api";

const ThemeSwitch = () => {
  const [active, setActive] = useState(false);
  const theme = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  const switchTheme = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      const userId = user.id;
      const newTheme = theme === "dark" ? "light" : "dark";
      api
        .put(
          `users/${userId}`,
          { dark_mode: newTheme === "dark" },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          localStorage.setItem("darK_mode", res.data.user.dark_mode);
          console.log(res.data.user);
          dispatch(setTheme(res.data.user.dark_mode ? "dark" : "light"));
        });
    } else {
      setActive(!active);
      dispatch(toggleTheme());
    }
  };
  return (
    <SwitchWrapper $active={active} onClick={switchTheme}>
      <Knob $active={active} />
    </SwitchWrapper>
  );
};

export default ThemeSwitch;
