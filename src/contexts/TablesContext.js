import { createContext, useContext } from "react";
import { useState } from "react";
import axios from "axios";
// 1
export const TablesContext = createContext();

// 3
// export const useSideBarContext = () => {
//   return useContext(TablesContext);
// };

// 2
const TablesContextProvider = ({ children }) => {
  const [content, setContent] = useState([]);
  function getAllTables() {
    axios
      .get("http://192.168.109.142:5050/api/v1/ros/positionMarker")
      .then((res) => {
        setContent(res.data.data.Position);
        console.log("hello");
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const tables = { getAllTables, content, setContent };

  return (
    <TablesContext.Provider value={tables}>{children}</TablesContext.Provider>
  );
};

export default TablesContextProvider;
