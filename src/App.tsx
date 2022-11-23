import React from "react";
import logo from "./logo.svg";
// import { Counter } from "./features/counter/Counter";
import { Outlet } from "react-router-dom";
// import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Outlet />
      </header>
    </div>
  );
}

export default App;
