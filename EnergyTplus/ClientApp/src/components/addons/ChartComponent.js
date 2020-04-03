import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    AreaSeries,
    Title,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';
import classNames from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { Stack, Animation } from '@devexpress/dx-react-chart';

const setStyle = (style) => {
    const wrap = withStyles({ root: style });
    return Target => wrap(({ classes, className, ...restProps }) => (
        <Target className={classNames(classes.root, className)} {...restProps} />
    ));
};

const LegendRoot = setStyle({
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
})(Legend.Root);

const LegendLabel = setStyle({
    whiteSpace: 'nowrap',
})(Legend.Label);

const ChartRoot = setStyle({
    paddingRight: '20px',
})(Chart.Root);

const format = () => tick => tick;
const stacks = [{
    series: ['Consumption', 'Price'],
}];
const stacksHouse = [{
    series: ['Consumption', 'Weather'],
}];
const stacksCons = [{
    series: ['Consumption', 'Date'],
}];
export default class ChartComponent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            forecasts:[],
            forplants:[],
            distforplants: [],
             loading: true,
        };
    }
    async componentDidMount() {
        //this.populateHouseData();
        await this.populatePlantData();
        await this.populateHouseData();
        this.state.forplants.map(plnt => {
            this.state.distforplants.push({ date: plnt.date, consumption:plnt.consumption,type:'plants'})
        });
        this.state.forecasts.map(plnt => {
            this.state.distforplants.push({ date: plnt.date, consumption: plnt.consumption, type: 'house' })
        });
        console.log(this.state.distforplants);
    }
    async populatePlantData() {
        const response = await fetch('api/Plants');
        const data = await response.json();
        this.setState({ forplants: data});
    }
    async populateHouseData() {
        const response = await fetch('api/HouseModels');
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });

    }
    createArea(chartData) {
        return (
            <div>
                <Paper>
                    <Chart
                        data={chartData}
                        rootComponent={ChartRoot}
                    >
                        <ArgumentAxis tickFormat={format} />
                        <ValueAxis />
                        <AreaSeries
                            name="Consumption"
                            valueField="consumption"
                            argumentField="plantName"
                        />
                        <Animation />
                        <Legend position="bottom" rootComponent={LegendRoot} labelComponent={LegendLabel} />
                        <Title text="Consumption plants" />
                        <Stack stacks={stacks} />
                    </Chart>
                </Paper>
                <Paper>
                    <Chart
                        data={chartData}
                        rootComponent={ChartRoot}
                    >
                        <ArgumentAxis tickFormat={format} />
                        <ValueAxis />
                        <AreaSeries
                            name="Price"
                            valueField="price"
                            argumentField="plantName"
                        />
                        <Animation />
                        <Legend position="bottom" rootComponent={LegendRoot} labelComponent={LegendLabel} />
                        <Title text="Price plants" />
                        <Stack stacks={stacks} />
                    </Chart>
                </Paper>
            </div>
        );
    }
    createAreaHouse(chartData) {
        return (
            <div>
                <Paper>
                    <Chart
                        data={chartData}
                        rootComponent={ChartRoot}
                    >
                        <ArgumentAxis tickFormat={format} />
                        <ValueAxis />
                        <AreaSeries
                            name="Consumption"
                            valueField="consumption"
                            argumentField="houseModelName"
                        />
                        <Animation />
                        <Legend position="bottom" rootComponent={LegendRoot} labelComponent={LegendLabel} />
                        <Title text="Consumption House" />
                        <Stack stacks={stacksHouse} />
                    </Chart>
                </Paper>
                <Paper>
                    <Chart
                        data={chartData}
                        rootComponent={ChartRoot}
                    >
                        <ArgumentAxis tickFormat={format} />
                        <ValueAxis />
                        <AreaSeries
                            name="Weather"
                            valueField="weather"
                            argumentField="houseModelName"
                        />
                        <Animation />
                        <Legend position="bottom" rootComponent={LegendRoot} labelComponent={LegendLabel} />
                        <Title text="Weather house" />
                        <Stack stacks={stacksHouse} />
                    </Chart>
                </Paper>
            </div>
        );
    }
    createAreaHousePlants(chartData) {
        return (
            <div>
                <Paper>
                    <Chart
                        data={chartData}
                        rootComponent={ChartRoot}
                    >
                        <ArgumentAxis tickFormat={format} />
                        <ValueAxis />
                        <AreaSeries
                            name="Consumption"
                            valueField="consumption"
                            argumentField="date"
                        />
                        <AreaSeries
                            name="Consumption 2"
                            valueField="consumption"
                            argumentField="date"
                        />
                        <Animation />
                        <Legend position="bottom" rootComponent={LegendRoot} labelComponent={LegendLabel} />
                        <Title text="Consumption House Plants" />
                        <Stack stacks={stacksCons} />
                    </Chart>
                </Paper>
            </div>
        );
    }
    render() {
        const { forplants: chartData } = this.state;
        const { forecasts: chartDataHouse } = this.state;
        const { classes } = this.props;
        let axisValue = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.createArea(chartData);
        let houseValue = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.createAreaHouse(chartDataHouse);
        const { distforplants: consumptionsData } = this.state;
        let consumtions = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.createAreaHousePlants(this.state.distforplants);
        return (
            <div>
                {axisValue}
                {houseValue}
                {consumtions}
            </div>
        );
    }
}