import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../AuthContext';

const NavigationBar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Navbar expand="lg" bg="white" variant="light" className="py-3 border-bottom rounded-0" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 fw-bold text-primary">
                    <img
                        height="40"
                        width="40"
                        src="https://upload.wikimedia.org/wikipedia/commons/7/74/Car_icon.png"
                        alt="Voiture Logo"
                        className="rounded-0 p-1 bg-light border border-secondary border-opacity-25 shadow-sm"
                        style={{ borderRadius: '10px' }}
                    />
                    <span className="ms-1">VoitureShop</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        {isAuthenticated ? (
                            <>
                                <Nav.Link as={NavLink} to="/dashboard" className="text-dark fw-semibold me-lg-3 px-3">
                                    Dashboard
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/add" className="text-dark fw-semibold me-lg-3 px-3">
                                    Ajouter Voiture
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/list" className="text-dark fw-semibold me-lg-3 px-3">
                                    Liste Voitures
                                </Nav.Link>
                                <div className="d-none d-lg-block border-start h-50 mx-3"></div>
                                <Nav.Link as={NavLink} to="/profile" className="text-secondary fw-semibold d-flex align-items-center gap-2">
                                    <FontAwesomeIcon icon={faUserCircle} size="lg" />
                                    <span>Mon Profil</span>
                                </Nav.Link>
                                <Nav.Link onClick={handleLogout} className="text-danger fw-bold ms-lg-2 d-flex align-items-center gap-2" style={{cursor: 'pointer'}}>
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                    <span>Logout</span>
                                </Nav.Link>
                            </>
                        ) : (
                            <Nav.Link as={NavLink} to="/login" className="btn btn-primary text-white fw-semibold px-4 py-2 rounded-pill d-flex align-items-center gap-2">
                                <FontAwesomeIcon icon={faSignInAlt} />
                                <span>Login</span>
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;