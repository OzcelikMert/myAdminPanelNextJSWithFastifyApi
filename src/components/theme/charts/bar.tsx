import React, {Component} from "react";
import {Bar, ChartProps} from "react-chartjs-2";
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS, ChartData,
    LinearScale,
    Title,
    Tooltip
} from "chart.js";
import Spinner from "react-bootstrap/Spinner";
import {PagePropCommonDocument} from "types/pageProps";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip
);

type PageState = {
    options: ChartProps<"bar">["options"]
    data: ChartData<"bar">
    isLoading: boolean
};

type PageProps = {
    labels: string[],
    data: any[],
    t: PagePropCommonDocument["t"]
};

class ThemeChartBar extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            isLoading: true,
            data: {
                labels: [],
                datasets: []
            },
            options: {
                responsive: true,
                elements: {
                    point: {
                        radius: 0
                    }
                }
            }
        }
    }

    componentDidMount() {
        let ctx = (document.createElement("canvas") as HTMLCanvasElement).getContext("2d") as CanvasFillStrokeStyles;

        let gradientBar = ctx.createLinearGradient(0, 0, 0, 181)
        gradientBar.addColorStop(0, '#6e3a87')
        gradientBar.addColorStop(1, 'rgba(154, 85, 255, 1)')

        this.setState({
            data: {
                labels: this.props.labels,
                datasets: [
                    {
                        label: this.props.t("visitors"),
                        borderColor: gradientBar,
                        backgroundColor: gradientBar,
                        hoverBackgroundColor: gradientBar,
                        borderWidth: 1,
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
        return this.state.isLoading ? <Spinner animation="border" /> : (
            <Bar
                itemRef='chart'
                className="chartLegendContainer"
                data={this.state.data}
                options={this.state.options}
            />
        )
    }
}

export default ThemeChartBar;