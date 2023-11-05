import React from "react";
import ReactDOM from "react-dom";
import MainPage from "./components/MainPage";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/Navbar/About";
import "./App.css";

import { Routes, Route } from "react-router-dom";

import { MyContextProvider } from "./context/MyContext";

function App() {
  return (
    <MyContextProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </MyContextProvider>
  );
}

export default App;
