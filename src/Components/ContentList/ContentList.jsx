import React from "react";
import TempItem from "./tempItem";
import SelectComponent from "../MainPageSelect/MainPageSelect";
import ContentItem from "../ContentItem/ContentItem";
import { useSelector } from "react-redux";
import { Box, Skeleton } from "@mui/material";

const ContentList = () => {
  let currencyData = useSelector((state) => state.currency.currencyData);
  const status = useSelector((state) => state.favourite.currencyStatus);
  const error = useSelector((state) => state.favourite.currencyError);

  const headerLabels = {
    nameF: "Офіційний курс",
    code: "Повна назва",
    nameS: "Код літерний",
    course: " ",
    symbol: "Код цифровий",
  };

  const statusCheck = () => {
    if (status === "loading" && error === null) {
      return (
        <Box sx={{ width: 300 }}>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </Box>
      );
    } else if (error != null) {
      return <h2>An error occured: {error}</h2>;
    } else {
      return currencyData.map((item) => {
        return <ContentItem key={item.id} props={item} />;
      });
    }
  };
  return (
    <div className="contentList">
      <SelectComponent />
      <TempItem props={headerLabels} />
      {statusCheck()}
    </div>
  );
};

export default ContentList;
