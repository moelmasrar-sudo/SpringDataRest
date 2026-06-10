import React, { useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Bienvenue = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Container className="py-5 d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
            <Row className="justify-content-center w-100">
                <Col md={10} lg={8} xl={6}>
                    <Card className="border-0 shadow-lg bg-white rounded-4 overflow-hidden">
                        <Card.Body className="text-center p-5">
                            <div className="mb-4">
                                <img
                                    height="80"
                                    width="80"
                                    src="https://upload.wikimedia.org/wikipedia/commons/7/74/Car_icon.png"
                                    alt="Logo"
                                    className="mb-3 p-2 bg-light rounded-circle shadow-sm"
                                />
                            </div>
                            <h1 className="display-5 fw-bold text-dark mb-3">
                                VoitureShop
                            </h1>
                            <p className="lead text-secondary mb-5">
                                La plateforme ultime pour gérer votre inventaire automobile avec efficacité et style.
                            </p>

                            <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                                {isAuthenticated ? (
                                    <Button as={Link} to="/dashboard" variant="primary" size="lg" className="px-5 py-3 rounded-pill fw-bold shadow-sm">
                                        Accéder au Dashboard <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                                    </Button>
                                ) : (
                                    <Button as={Link} to="/login" variant="primary" size="lg" className="px-5 py-3 rounded-pill fw-bold shadow-sm">
                                        Se Connecter Maintenant <FontAwesomeIcon icon={faSignInAlt} className="ms-2" />
                                    </Button>
                                )}
                            </div>
                            
                            <p className="text-muted mt-5 small">
                                Explorez nos fonctionnalités : Statistiques en temps réel, gestion d'inventaire, et bien plus.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Bienvenue;