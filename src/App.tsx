import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/Logout";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import EventList from "./components/EventList";
import Layout from './pages/Layout';

function App() {
  return (
      <div className="App">
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route path="eventlist" element={<EventList />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  {/* Define other routes here */}
              </Route>
              <Route path="/login" element={<LoginForm/>} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/header" element={<Header />} />
              <Route
                  path="/dashboard"
                  element={
                      <ProtectedRoute requiredRole={'USER'}>
                          <Dashboard />
                      </ProtectedRoute>
                  }
              />
              {/* other routes */}
          </Routes>
      </div>
  );
}

export default App;
