import React, { useState, useEffect, useRef, useCallback } from "react";

import useSWR from "swr";
import eChartsLib from "echarts";
import { generateOptions } from "./helpers";
import { BASE_URL } from "../../config/API";
import { FullScreenLoader } from "../../utils/Spinners/FullScreenSpinner";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function WeatherWidget({ getRequestOptions }) {
  const chartContainerRef = useRef();
  const [chart, setChart] = useState(null);

  const { data, error } = useSWR(
    [`${BASE_URL}weather`, getRequestOptions],
    fetcher
  );
  const updateChartWidth = useCallback(() => {
    const width = window.innerWidth;
    if (chart) {
      chart.resize(width);
    }
  }, [chart]);
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
  }, [data, error, updateChartWidth, chart]);

  useEffect(() => {
    if (chart) {
      const myOptions = generateOptions(data);
      chart.setOption(myOptions);
    }
  }, [chart, data]);

  function getChart() {
    if (chartContainerRef.current) {
      return eChartsLib.init(chartContainerRef.current);
    }
  }

  return data ? (
    !data.error && <div style={{ height: 500 }} ref={chartContainerRef}></div>
  ) : (
    <FullScreenLoader />
  );
}
