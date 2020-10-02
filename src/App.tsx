import React from 'react';
import logo from './logo.png';
import './App.css';
import { Calculator } from "./Calculator";

function App() {
    return (
    <div className="App">
      <header className="App-header">
          <img src={logo}/>
        <h1>Fahrzeit Preisrechner</h1>
          <Calculator defaultNumberOfDays={20} defaultObjectsPerDay={30}></Calculator>
      </header>
    </div>
  );
}


export default App;
