import React, {Component} from "react";
import {Doughnut} from "react-chartjs-2";
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    LineElement,
    Title,
    Tooltip
} from "chart.js";

ChartJS.register(LineElement, BarElement, ArcElement, LinearScale, Title, CategoryScale, Tooltip);

type PageState = {
    options: any
};

type PageProps = {
    data: {
        labels: string[],
        datasets: {
            data: any[],
            backgroundColor?: any[],
            hoverBackgroundColor?: any[],
            borderColor?: any[],
            legendColor?: any[]
        }[]
    }
};

class ThemeChartDonut extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            options: {
                responsive: true,
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                legend: false,
            }
        }
    }


    render() {
        return (
            <Doughnut
                data={this.props.data}
                options={this.state.options}
            />
        )
    }
}

export default ThemeChartDonut;