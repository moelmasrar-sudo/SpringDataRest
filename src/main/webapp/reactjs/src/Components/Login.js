import React, { useState, useContext } from 'react';
import { Card, Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/login', credentials);
            const token = res.headers['authorization']?.replace('Bearer ', '') || res.headers['Authorization']?.replace('Bearer ', '');
            
            if (token) {
                login(token);
                navigate('/dashboard');
            } else {
                setError("Échec de la connexion. Aucun jeton reçu.");
            }
        } catch (err) {
            setError("Identifiants invalides. Veuillez réessayer.");
        }
    };

    return (
        <Container className="my-auto py-5">
            <Row className="w-100 justify-content-center m-0">
                <Col md={8} lg={5} xl={4}>
                    <div className="text-center mb-4">
                        <img
                            height="60"
                            width="60"
                            src="https://upload.wikimedia.org/wikipedia/commons/7/74/Car_icon.png"
                            alt="Logo"
                            className="mb-3"
                        />
                        <h2 className="fw-bold text-dark">Bienvenue</h2>
                        <p className="text-muted">Connectez-vous pour gérer votre inventaire</p>
                    </div>
                    
                    <Card className="border-0 shadow-lg p-4 rounded-4 bg-white">
                        <Card.Body>
                            {error && <Alert variant="danger" className="py-2 small border-0 shadow-sm">{error}</Alert>}
                            <Form onSubmit={handleLogin}>
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label className="small fw-bold text-uppercase opacity-75">Nom d'utilisateur</Form.Label>
                                    <div className="input-group bg-light rounded-3 overflow-hidden border">
                                        <span className="input-group-text border-0 bg-transparent text-muted">
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </span>
                                        <Form.Control required autoComplete="off"
                                            type="text" name="username" value={credentials.username}
                                            onChange={handleChange}
                                            className="border-0 bg-transparent py-2" placeholder="admin" 
                                            style={{ boxShadow: 'none' }} />
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="password">
                                    <Form.Label className="small fw-bold text-uppercase opacity-75">Mot de passe</Form.Label>
                                    <div className="input-group bg-light rounded-3 overflow-hidden border">
                                        <span className="input-group-text border-0 bg-transparent text-muted">
                                            <FontAwesomeIcon icon={faLock} />
                                        </span>
                                        <Form.Control required autoComplete="off"
                                            type="password" name="password" value={credentials.password}
                                            onChange={handleChange}
                                            className="border-0 bg-transparent py-2" placeholder="••••••••"
                                            style={{ boxShadow: 'none' }} />
                                    </div>
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100 py-2 fw-bold rounded-3 shadow-sm mt-2">
                                    Se Connecter
                                </Button>
                                
                                <div className="text-center mt-4 pt-2 border-top">
                                    <p className="text-muted small mb-0">Besoin d'aide ? Contactez l'administrateur</p>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
