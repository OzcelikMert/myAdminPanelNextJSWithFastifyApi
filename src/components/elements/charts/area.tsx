import React, {Component} from "react";
import {ChartProps, Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend, ChartData,
} from 'chart.js';
import ComponentToolSpinner from "react-bootstrap/ComponentToolSpinner";

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
    options: ChartProps<"line">["options"]
    data: ChartData<"line">
    isLoading: boolean
};

type IPageProps = {
    labels: string[],
    data: any[],
    toolTipLabel?: string
};

export default class ComponentChartArea extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {
            isLoading: true,
            data: {
                labels: [],
                datasets: []
            },
            options: {
                responsive: true,
                elements:{
                  line: {
                      tension: 0.4
                  }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        displayColors: false
                    }
                }
            }
        }
    }

    componentDidMount() {
        let bgColor = 'rgba(28,57,189,0.71)';
        let borderColor = "#1863d3";
        let pointBorderColor = "#6a0e98"

        this.setState({
            data: {
                labels: this.props.labels,
                datasets: [
                    {
                        fill: true,
                        pointBorderWidth: 7,
                        pointBorderColor: pointBorderColor,
                        label: this.props.toolTipLabel,
                        borderColor: borderColor,
                        backgroundColor: bgColor,
                        hoverBackgroundColor: bgColor,
                        borderWidth: 5,
                        data: this.props.data
                    }
                ]
            }
        }, () => {
            this.setState({
                isLoading: false
            })
        })
    }

    render() {
        return this.state.isLoading ? <ComponentToolSpinner animation="border" /> : (
            <Line
                itemRef='chart'
                className="chartLegendContainer"
                data={this.state.data}
                options={this.state.options}
            />
        )
    }
}