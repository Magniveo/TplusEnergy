import React, { Component } from 'react';
import ChartComponent from './addons/ChartComponent';

export class DataChart extends Component {
    static displayName = DataChart.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], forplants: [], loading: true };
    }

    componentDidMount() {
    }
    render() {
        return (
            <div>
                <ChartComponent/>
            </div>
        );
    }
}