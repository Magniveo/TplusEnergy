import React, { Component } from 'react';

export class DataHouse extends Component {
    static displayName = DataHouse.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], forplants:[], loading: true };
    }

    componentDidMount() {
        this.populateHouseData();
        this.populatePlantData();
    }

    static renderForecastsTable(forecasts) {
        return (
                    <table className='table table-striped' aria-labelledby="tabelLabel">
                        <thead>
                            <tr>
                                <th>HouseModelName</th>
                                <th>Date</th>
                                <th>Temp.</th>
                                <th>Consumption</th>
                            </tr>
                        </thead>
                        <tbody>
                            {forecasts.map(forecast =>
                                <tr key={forecast.houseModelID}>
                                    <td>{forecast.houseModelName}</td>
                                    <td>{forecast.date.split('T', 1)}</td>
                                    <td>{forecast.weather}</td>
                                    <td>{forecast.consumption}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
        );
    }
    static renderForPlantsTable(forecasts) {
        return (
                    <table className='table table-striped' aria-labelledby="tabelLabel">
                        <thead>
                            <tr>
                                <th>Plant Name</th>
                                <th>Date</th>
                                <th>Price</th>
                                <th>Consumption</th>
                            </tr>
                        </thead>
                        <tbody>
                            {forecasts.map(forecast =>
                                <tr key={forecast.plantID}>
                                    <td>{forecast.plantName}</td>
                                    <td>{forecast.date.split('T', 1)}</td>
                                    <td>{forecast.price}</td>
                                    <td>{forecast.consumption}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
        );
    }
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : DataHouse.renderForecastsTable(this.state.forecasts); 
        let plantscont = this.state.loading
            ? <p><em>Loading...</em></p>
            : DataHouse.renderForPlantsTable(this.state.forplants); 
        return (
            <div>
                <h1 id="tabelLabel" >Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                <div className="col-sm-12">
                    Filter
                </div>
                <div className="col-xs-12">
                        {contents}
                        {plantscont}
                </div>
            </div>
        );
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
    }
}