import React from "react";
import { Routes, Route, Router, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Logout from "./components/Logout";
import RegisterForm from "./components/authentification/RegisterComponent";
import LoginForm from "./components/authentification/LoginComponent";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

import EventForm from "./components/events/EventForm";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import EventList from "./components/events/EventList";
import { isAuthenticated } from "./utils/authUtils";

function App() {
  const redirectIfAuthenticated = (component: React.ReactNode) => {
    return isAuthenticated() ? <Navigate to="/" replace /> : component;
  };
  // if !isAuthenticated() disable logout 
  const logout = () => {
    if (!isAuthenticated()) {
      return <Navigate to="/" replace />;
    }
  }
  return (
    <div className="App">
      <Layout>
        <Routes>
        <Route path="/login" element={redirectIfAuthenticated(<LoginForm />)} />
          <Route path="/register" element={redirectIfAuthenticated(<RegisterForm />)} />
          <Route path="/logout" element={logout()} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/events" element={<EventList />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute role="USER">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/create"
            element={
              <ProtectedRoute role="ADMIN">
                <EventForm onSave={() => {}} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
