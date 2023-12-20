import React, { useRef, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";

const CurrencyChart = (props) => {
  const statusDate = useSelector((state) => state.currency.dateCurrencyStatus);
  const errorDate = useSelector((state) => state.currency.dateCurrencyError);
  let datesData = useSelector((state) => state.currency.datesData);
  let ratesData = useSelector((state) => state.currency.ratesData);

  const chartRef = useRef();
  let chartInstance = null;

  useEffect(() => {
    renderChart();
  }, []);

  const renderChart = () => {
    const data = {
      labels: datesData,
      datasets: [
        {
          label: "Курс валюти",
          data: ratesData,
          fill: false,
          borderColor: "blue",
        },
      ],
    };

    const options = {
      responsive: true,
    };

    if (chartInstance) {
      chartInstance.destroy();
    }
    chartInstance = new Chart(chartRef.current, {
      type: "line",
      data: data,
      options: options,
    });
  };

  return (
    <div className="CurrencyChart">
      <canvas ref={chartRef} />
    </div>
  );
};

export default CurrencyChart;
