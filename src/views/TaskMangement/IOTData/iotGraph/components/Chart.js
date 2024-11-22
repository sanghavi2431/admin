import React from "react";
import HighchartsReact from "highcharts-react-official";

class Chart extends React.Component {
  componentDidMount() {
    this.chart = this.refs.chart.chart;
  }

  render() {
    return (
      <div>
        <HighchartsReact
          highcharts={this.props.highcharts}
          constructorType={"chart"}
          options={this.props.options}
          ref={"chart"}
        />
      </div>
    );
  }
}

export default Chart;
