import React, { useState, useEffect, useRef } from "react";

import useSWR from "swr";
import { getToken } from "../../services/Authentication";
import eChartsLib from "echarts";
import { generateOptions } from "./helpers";
import { BASE_URL } from "../../config/API";

const getRequestOptions = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `bearer ${getToken()}`,
  },
};

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function WeatherWidget() {
  const chartContainerRef = useRef();
  const [chart, setChart] = useState(null);
  const { data, error } = useSWR(
    [`${BASE_URL}weather`, getRequestOptions],
    fetcher,
    {
      suspense: true,
    }
  );
  window.addEventListener("resize", updateChartWidth);

  useEffect(() => {
    if (!error) {
      const chart = getChart();
      setChart(chart);
    }
    return () => {
      if (chart) {
        chart.dispose();
      }
      window.removeEventListener("resize", updateChartWidth);
    };
  }, [data]);

  useEffect(() => {
    if (chart) {
      const myOptions = generateOptions(data);
      chart.setOption(myOptions);
    }
  }, [chart]);

  function updateChartWidth() {
    const width = window.innerWidth;
    if (chart) {
      chart.resize(width);
    }
  }

  function getChart() {
    if (chartContainerRef.current) {
      return eChartsLib.init(chartContainerRef.current);
    }
  }

  if (error) return <div>Failed to load</div>;
  return <div style={{ height: 500 }} ref={chartContainerRef}></div>;
}
