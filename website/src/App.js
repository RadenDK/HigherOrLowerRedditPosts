import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import FrontPage from "./pages/FrontPage";
import GamePage from "./pages/GamePage";
import GameOverPage from "./pages/GameOverPage";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<FrontPage />} />
        <Route path="/FrontPage" element={<FrontPage />} />
        <Route path="/GamePage" element={<GamePage />} />
        <Route path="/GameOverPage" element={<GameOverPage />} />
      </Routes>
    </Router>
  );
}

export default App;
