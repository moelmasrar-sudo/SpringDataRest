import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavigationBar from './Components/NavigationBar';
import Footer from "./Components/Footer";
import Bienvenue from "./Components/Bienvenue";
import Voiture from "./Components/Voiture";
import VoitureListe from "./Components/VoitureListe";
import EditVoiture from "./Components/EditVoiture";
import Dashboard from "./Components/Dashboard";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import { AuthProvider } from "./AuthContext";

const EditVoitureWrapper = () => {
    const { id } = useParams();
    return <EditVoiture id={id} />;
};

function App() {
    return (
        <AuthProvider>
            <div className="d-flex flex-column min-vh-100 bg-body-tertiary">
                <Router>
                    <NavigationBar />
                    <Container className="flex-grow-1 py-4">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/" element={<Bienvenue />} />
                            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                            <Route path="/add" element={<ProtectedRoute><Voiture /></ProtectedRoute>} />
                            <Route path="/list" element={<ProtectedRoute><VoitureListe /></ProtectedRoute>} />
                            <Route path="/edit/:id" element={<ProtectedRoute><EditVoitureWrapper /></ProtectedRoute>} />
                        </Routes>
                    </Container>
                    <Footer />
                </Router>
            </div>
        </AuthProvider>
    );
}

export default App;