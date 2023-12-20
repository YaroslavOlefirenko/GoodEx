import React from "react";
import { useSelector } from "react-redux";
const TempItem = ({ props }) => {
  const { nameS, nameF, code, course, symbol } = props;

  const darkTheme = useSelector((state) => state.theme.darkTheme);

  return (
    <div className={darkTheme ? "colortemp tempItem" : "tempItem"}>
      <div className="symbol">{symbol}</div>
      <div className="nameS">{nameS}</div>
      <div className="code">{code}</div>
      <div className="nameF">{nameF}</div>
      <div className="course">{course}</div>
    </div>
  );
};

export default TempItem;
