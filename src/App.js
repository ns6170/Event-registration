import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HelloUserPage from './pages/HelloUserPage';
import CreateEventPage from './pages/CreateEventPage';
import EditEventPage from './pages/EditEventPage';
import EventDetailsPage from './pages/EventDetailsPage';
import EventRegistrationsPage from './pages/EventRegistrationsPage';
import VenuesPage from './pages/VenuesPage';
import CreateVenuePage from './pages/CreateVenuePage';
import EditVenuePage from './pages/EditVenuePage';

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {/* Events */}
            <Route
              path="/hello"
              element={<PrivateRoute><HelloUserPage /></PrivateRoute>}
            />
            <Route
              path="/events/new"
              element={<PrivateRoute><CreateEventPage /></PrivateRoute>}
            />
            <Route
              path="/events/:id/edit"
              element={<PrivateRoute><EditEventPage /></PrivateRoute>}
            />
            <Route
              path="/events/:id"
              element={<PrivateRoute><EventDetailsPage /></PrivateRoute>}
            />
            <Route
              path="/events/:eventId/registrations"
              element={<PrivateRoute><EventRegistrationsPage /></PrivateRoute>}
            />

            {/* Venues */}
            <Route
              path="/venues"
              element={<PrivateRoute><VenuesPage /></PrivateRoute>}
            />
            <Route
              path="/venues/new"
              element={<PrivateRoute><CreateVenuePage /></PrivateRoute>}
            />
            <Route
              path="/venues/:id/edit"
              element={<PrivateRoute><EditVenuePage /></PrivateRoute>}
            />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}
