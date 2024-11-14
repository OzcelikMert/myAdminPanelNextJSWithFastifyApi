import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js';

ChartJS.register(
  LineElement,
  BarElement,
  ArcElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip
);

type IPageState = {
  options: any;
};

type IPageProps = {
  data: {
    labels: string[];
    datasets: {
      data: any[];
      backgroundColor?: any[];
      hoverBackgroundColor?: any[];
      borderColor?: any[];
      legendColor?: any[];
    }[];
  };
};

class ComponentChartDonut extends Component<IPageProps, IPageState> {
  constructor(props: IPageProps) {
    super(props);
    this.state = {
      options: {
        responsive: true,
        animation: {
          animateScale: true,
          animateRotate: true,
        },
        legend: false,
      },
    };
  }

  render() {
    return <Doughnut data={this.props.data} options={this.state.options} />;
  }
}

export default ComponentChartDonut;
