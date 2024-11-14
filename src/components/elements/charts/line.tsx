import React, { Component } from 'react';
import { ChartProps, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartData,
} from 'chart.js';
import Spinner from 'react-bootstrap/Spinner';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

type IPageState = {
  options: ChartProps<'line'>['options'];
  data: ChartData<'line'>;
  isLoading: boolean;
};

type IPageProps = {
  labels?: string[];
  data: any[];
  toolTipLabel?: string;
};

export default class ComponentChartLine extends Component<
  IPageProps,
  IPageState
> {
  constructor(props: IPageProps) {
    super(props);
    this.state = {
      isLoading: true,
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        responsive: true,
        elements: {
          line: {
            tension: 0.4,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            displayColors: false,
          },
        },
      },
    };
  }

  componentDidMount() {
    const borderColor = '#1863d3';

    this.setState(
      {
        data: {
          labels: this.props.labels,
          datasets: [
            {
              pointBorderWidth: 0,
              label: this.props.toolTipLabel,
              borderColor: borderColor,
              borderWidth: 5,
              data: this.props.data,
            },
          ],
        },
      },
      () => {
        this.setState({
          isLoading: false,
        });
      }
    );
  }

  render() {
    return this.state.isLoading ? (
      <Spinner animation="border" />
    ) : (
      <Line
        itemRef="chart"
        className="chartLegendContainer"
        data={this.state.data}
        options={this.state.options}
        redraw={true}
      />
    );
  }
}
