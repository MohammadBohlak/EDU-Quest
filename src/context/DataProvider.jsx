import { createContext, useEffect, useState } from "react";
import { api } from "../utils/api/api";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const refresh = () => {
    console.log("refresh");
    setRefreshFlag((prev) => !prev);
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("categories");
      setCategories([{ name: "All" }, ...res.data.categories]);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await api.get("courses");
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchCategories(), fetchCourses()]);
    };

    fetchData();
  }, [refreshFlag]);

  return (
    <DataContext.Provider
      value={{
        categories,
        setCategories,
        courses,
        setCourses,
        refresh,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
