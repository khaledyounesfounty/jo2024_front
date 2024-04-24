import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/Logout";
import RegisterForm from "./components/authentification/RegisterComponent";
import LoginForm from "./components/authentification/LoginComponent";
import Header from "./components/Header";
import EventList from "./components/events/EventList";
import Layout from "./components/layout/Layout";
import EventCreateForm from "./components/EventCreateFrom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./routes/PrivateRoute";
import EventForm from "./components/events/EventForm";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

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
              <PrivateRoute role="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/user"
            element={
              <PrivateRoute role="user">
                <UserDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/events/create"
            element={
              <PrivateRoute role="admin">
                <EventForm onSave={() => {}} />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
