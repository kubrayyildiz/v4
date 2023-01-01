import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import paramButPos from "./paramButtonPositionCss.module.css";

const ParamButtonPosition = () => {
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
  useEffect(() => {
    getAllTables();
  }, []);
 
  return (
   <>
 
        {content.map((item) => (
          <div>
            <button className={paramButPos["button"]}>{item.name}</button>
          </div>
        ))}

    </>
  );
};
export default ParamButtonPosition;