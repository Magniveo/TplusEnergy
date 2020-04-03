import React, { Component } from 'react';
import TableHouse from './addons/TableHouse';
import TablePlants from './addons/TablePlants';
export class PlantsData extends Component {
    static displayName = PlantsData.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], forplants: [],};
    }
    componentDidMount() {
        this.populateHouseData();
        this.populatePlantData();
    }
    async populateHouseData() {
        const response = await fetch('api/HouseModels');
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }
    async populatePlantData() {
        const response = await fetch('api/Plants');
        const data = await response.json();
        this.setState({ forplants: data, loading: false });
        console.log(data);
    }
    render() {
        return (
            <div>
                <TableHouse rows={this.state.forecasts} />
                <TablePlants rows={this.state.forplants} />
            </div>
        );
    }
}






