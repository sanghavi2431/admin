import Highcharts from "highcharts";
import _ from "lodash";
import Chart from "./Chart";
import raw from "./data.json";


export default function ScatterChart({data,condition}) {
    // console.log("data",data)
  let  series = [];
_.chain(data)
  .groupBy("heading")
  // .tap(console.log)
  .forOwn((value, key) =>
    series.push({ name: key, data: _.map(value, (v) => Object.values(v)) })
  )
  .value();
console.log("series", series);
const chartOptions = {
  chart: {
    type: "scatter",
    zoomType: "xy",
  },
  title: {
    text: "Comparative analysis",
  },
  xAxis: {
    title: {
      enabled: true,
      text: `Average ${condition}`,
    },
    startOnTick: true,
    endOnTick: true,
    showLastLabel: true,
  },
  yAxis: {
    title: {
      text: "Number of people",
    },
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    scatter: {
      marker: {
        radius: 5,
        states: {
          hover: {
            enabled: true,
            lineColor: "rgb(100,100,100)",
          },
        },
      },
      states: {
        hover: {
          marker: {
            enabled: false,
          },
        },
      },
      tooltip: {
        headerFormat: ``,
        pointFormat: `<b>{point.name}</b> <br><b>Avg ${condition}: </b>{point.x}<br><b>People Max: </b>{point.y} <br>`,
      },
      keys: [
        "name",
        "y",
        "x",
      ],
    },
  },
  series,
};
  return (
    <div>
      <Chart options={chartOptions} highcharts={Highcharts} />
    </div>
  );
}
