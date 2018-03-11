import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Homepage from './components/Homepage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Homepage name={""} images={[]} avatar={""} />
      </div>
    );
  }
}

export default App;
