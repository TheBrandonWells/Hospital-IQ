import React, { Component } from 'react';
import { Table } from 'reactable';
import Loading from 'react-loading';
import axios from 'axios';

import logo from './logo.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        loading: true,
      }
  }

  componentDidMount() {
      var _this = this;
      this.serverRequest =
        axios
          .get("https://private-66479-hospiqtest.apiary-mock.com/units")
          .then(function(result) {
            //once we have data set loading to false and populate our table state.
            _this.setState({
              tabularData: result.data,
              loading: false
            });
          })
          .catch(function (error) {
            console.log(error);
          });
    }

  componentWillUnmount(){
    this.serverRequest.abort();
  }

  render() {
    return (
        <div className="app">
          <div className="appHeader">
            <img src={logo} className="appLogo" alt="logo" />
            <h2>Frontend Coding Exercise</h2>
          </div>
          <p className="appIntro">
            Here's my Project grabbing the data from the api and making a sortable react table.<br /> Please direct any questions to <strong>Brandon@BrandonRwells.com</strong>.
          </p>

          {this.state.loading ? (
            <Loading type='cylon' color='#0CA4DB' />
          ) : (
            <Table className="dataTable" data={this.state.tabularData} sortable={true} defaultSort={{column: 'highAlarm', direction: 'desc'}} />
          )}
      </div>
    );
  }
}

export default App;
