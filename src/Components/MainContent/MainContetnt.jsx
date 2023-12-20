import React, { useState, useEffect } from "react";
import CurrencyChart from "./CurrencyChart";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrency,
  fetchDateCurrency,
} from "../../rdx/features/Currencies/currencies";
import { Box } from "@mui/system";
import { Skeleton } from "@mui/material";

const MainContent = () => {
  const currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  let monthe, yeare;
  const defaultStartDate = `${year}-${month}-${day}`;
  if (month === 1) {
    monthe = 12;
    yeare = year - 1;
  } else {
    monthe = month - 1;
    if (monthe < 10) {
      monthe = "" + "0" + monthe;
    }
    yeare = year;
  }
  const defaultEndDate = `${yeare}-${monthe}-${day}`;

  const { id } = useParams();
  const curData = useSelector((state) => state.currency.oneCurrencyData);
  const statusOne = useSelector((state) => state.currency.oneCurrencyStatus);
  const errorOne = useSelector((state) => state.currency.oneCurrencyError);
  const statusDate = useSelector((state) => state.currency.dateCurrencyStatus);
  let datesData = useSelector((state) => state.currency.datesData);
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(defaultEndDate);
  const [endDate, setEndDate] = useState(defaultStartDate);
  const [key, setKey] = useState(0);

  const changeKey = () => {
    setKey(key + 1);
  };

  let darkTheme = useSelector((state) => state.theme.darkTheme);

  useEffect(() => {
    dispatch(fetchCurrency(id));
    setKey(1);
  }, [dispatch, id]);

  useEffect(() => {
    console.log(statusDate);
  }, [statusDate]);
  // Ефект викликається при завантаженні компонента

  const handleStartDateChange = (event) => {
    changeKey();
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    changeKey();
    setEndDate(event.target.value);
  };

  // Виконати дії після натискання кнопки
  const handleSubmit = (event) => {
    event.preventDefault();
    let start = "" + startDate.replace("-", "").replace("-", "");
    let end = "" + endDate.replace("-", "").replace("-", "");

    start = start.split("");
    end = end.split("");
    if (start[6] == "0") {
      start[6] = start[7];
      start[7] = "";
    }
    if (end[6] == "0") {
      end[6] = end[7];
      end[7] = "";
    }
    start = start.join("");
    end = end.join("");
    dispatch(
      fetchDateCurrency({
        cur: curData[0].cc,
        startDate: start,
        endDate: end,
      })
    );
    changeKey();
    console.log("Стартова дата:", start);
    console.log("Кінцева дата:", end);
  };

  const statusCheck = () => {
    if (statusOne === "loading" && errorOne === null) {
      return <h2>Loading...</h2>;
    } else if (errorOne != null) {
      return <h2>An error occured: {errorOne}</h2>;
    } else if (curData !== {}) {
      const { cc, exchangedate, r030, rate, txt } = curData[0];
      return (
        <div>
          <p>Цифровий код: {r030}</p>
          <p>Літерний код: {cc}</p>
          <p>Курс: {rate}</p>
          <p>Повна назва: {txt}</p>
          <p>Дата оновлення: {exchangedate}</p>
        </div>
      );
    }
  };

  return (
    <div className={darkTheme ? "dark" : "light"}>
      <div className="MainContent">
        <div className="MainContent__Item">
          <div className="MainContent__Choice">
            <h2>Графік</h2>
            <hr />
            <form onSubmit={handleSubmit} className="Choice_Item">
              <p className="Choice_Item"> Початкова дата </p>
              <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                className="Choice_Item"
              />
              <p className="Choice_Item"> Кінцева дата </p>
              <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                className="Choice_Item"
              />
              <br />
              <button type="submit">Відобразити</button>
            </form>
          </div>
          <div className="MainContent__Info">
            <h2>Валюта</h2>
            <hr />
            {statusCheck()}
          </div>
        </div>
        <div className="MainContent__Chart">
          {statusDate === "resolved" && datesData != [] ? (
            <CurrencyChart key={key} />
          ) : (
            <h2>
              Для відображення графіку потрібно встановити та запустити
              розширення для браузера:{" "}
              <a href="https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc">
                розширення
              </a>
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
