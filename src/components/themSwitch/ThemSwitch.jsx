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
      const darK_mode = localStorage.getItem("darK_mode");
      // console.log(darK_mode);
      const newTheme = darK_mode == true ? false : true;
      localStorage.setItem("darK_mode", newTheme);
      api
        .put(
          `users/${userId}`,
          { dark_mode: newTheme },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          // const updatedLang = res.data.user.language;
          // i18n.changeLanguage(updatedLang);
          // dispatch(changeLanguage(updatedLang));
          // localStorage.setItem("darK_mode", res.data.user.dark_mode);
          console.log(res.data.user.dark_mode);
          // setActive(res.data.user.dark_mode);
          // dispatch(setTheme(`${res.data.user.dark_mode ? "dark" : "light"}`));
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
