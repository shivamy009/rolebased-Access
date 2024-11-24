import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Homepage from "./Pages/HomePage";
import TaskManagement from "./Pages/Dashboards/AdminDashboard";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/home-admin" element={<Layout><TaskManagement/></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
