const BASE_CHART_OPTIONS = {
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: generateWeekDays(),
  },
  yAxis: {
    type: "value",
    axisLabel: {
      formatter: "{value} °C",
    },
  },
};

function generateWeekDays() {
  function getDayName(date) {
    const options = { weekday: "short" };
    return date.toLocaleDateString("en-US", options);
  }
  let result = ["Today"];
  const today = new Date();
  for (let index = 1; index < 7; index++) {
    result[index] = getDayName(
      new Date(today.setDate(today.getDate() + index))
    );
  }
  return result;
}

function generateTemperatures(data) {
  const tempList = data.list;
  let [day, min, max, night, eve] = [[], [], [], [], []];
  for (const item of tempList) {
    day.push(item.temp.day);
    min.push(item.temp.min);
    max.push(item.temp.max);
    night.push(item.temp.night);
    eve.push(item.temp.eve);
  }

  return { day, min, max, night, eve };
}

export function generateOptions(data) {
  const legend = {
    data: ["day", "min", "max", "night", "eve"],
  };
  const temperatures = generateTemperatures(data);

  const series = legend.data.map((legendName) => {
    return {
      name: legendName,

      type: "line",
      data: temperatures[legendName],
    };
  });

  return { ...BASE_CHART_OPTIONS, legend, series };
}
