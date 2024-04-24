import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Logout from "./components/Logout";
import RegisterForm from "./components/authentification/RegisterComponent";
import LoginForm from "./components/authentification/LoginComponent";
import Layout from "./components/layout/Layout";
import EventCreateForm from "./components/EventCreateFrom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

import EventForm from "./components/events/EventForm";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import EventList from "./components/events/EventList";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          {/* <Route path="/" element={<Layout />}>
          <Route path="eventlist" element={<EventList />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute requiredRole={"USER"}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="create-event"
            element={
              <ProtectedRoute requiredRole={"ADMIN"}>
                <EventCreateForm />
              </ProtectedRoute>
            }
          />
    
        </Route>*/}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterForm />} />
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
