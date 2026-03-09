import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register"
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import MemberDashboard from "./pages/MemberDashboard";
import SubscriptionPage from "./pages/SubscriptionPage";
import TrainerListPage from "./pages/TrainerListPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashborad" element={<Dashboard />} />
        <Route path="/memberdashboard" element={<MemberDashboard/>}/>
        <Route path="/subscriptions" element={<SubscriptionPage/>}/>
        <Route path="/trainers" element={<TrainerListPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;