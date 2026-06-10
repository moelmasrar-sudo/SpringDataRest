import React, { useContext } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { AuthContext } from '../AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faShieldAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
                        <div className="bg-primary py-5 text-center">
                            <FontAwesomeIcon icon={faUserCircle} size="6x" className="text-white opacity-75 mb-3" />
                            <h2 className="text-white fw-bold mb-0">{user?.username}</h2>
                            <p className="text-white-50 small text-uppercase fw-bold mt-1">Utilisateur Vérifié</p>
                        </div>
                        <Card.Body className="p-4 p-lg-5">
                            <h5 className="fw-bold text-dark mb-4 border-bottom pb-2">Informations du Compte</h5>
                            
                            <div className="d-flex align-items-center mb-4">
                                <div className="bg-light p-3 rounded-3 me-3 text-primary">
                                    <FontAwesomeIcon icon={faEnvelope} size="lg" />
                                </div>
                                <div>
                                    <p className="text-muted small mb-0 fw-bold text-uppercase">Nom d'utilisateur</p>
                                    <p className="text-dark fw-semibold mb-0">{user?.username}</p>
                                </div>
                            </div>

                            <div className="d-flex align-items-center mb-4">
                                <div className="bg-light p-3 rounded-3 me-3 text-success">
                                    <FontAwesomeIcon icon={faShieldAlt} size="lg" />
                                </div>
                                <div>
                                    <p className="text-muted small mb-0 fw-bold text-uppercase">Rôle de Sécurité</p>
                                    <Badge bg="success" className="px-3 py-2 rounded-pill">
                                        {user?.username === 'admin' ? 'ADMINISTRATEUR' : 'UTILISATEUR'}
                                    </Badge>
                                </div>
                            </div>

                            <div className="mt-5 p-3 bg-light rounded-3 border-start border-primary border-4">
                                <p className="mb-0 text-secondary small italic">
                                    "Vous êtes connecté à une session sécurisée. Toutes vos actions sur l'inventaire sont enregistrées pour la sécurité du magasin."
                                </p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
