import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { UploadXml } from './components/UploadXml'
import { DataHouse } from './components/DataHouse'
import { PlantsData } from './components/PlantsData'
import { DataChart } from './components/DataChart'

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetch-data' component={FetchData} />
            <Route path='/upload-xml' component={UploadXml} />
            <Route path='/data-house' component={DataHouse} />
            <Route path='/plants-data' component={PlantsData} />
            <Route path='/data-chart' component={DataChart} />
      </Layout>
    );
  }
}
