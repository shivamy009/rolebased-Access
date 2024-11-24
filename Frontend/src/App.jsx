import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Homepage from "./Pages/HomePage";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout ><Homepage/></Layout>} />
        
      </Routes>
    </Router>
  );
};

export default App;
