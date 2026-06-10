import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Container, ProgressBar, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faDollarSign, faChartPie, faList } from '@fortawesome/free-solid-svg-icons';
import axios from '../services/api';

const API_HOST = process.env.REACT_APP_API_HOST || "http://localhost:8080/api";

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalCars: 0,
        totalValue: 0,
        carsByMarque: {}
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_HOST}/stats`)
            .then(response => {
                setStats(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load dashboard stats", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Container className="vh-100 d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <Spinner animation="grow" variant="primary" />
                    <p className="mt-2 text-muted fw-semibold">Génération de vos statistiques...</p>
                </div>
            </Container>
        );
    }

    const marques = Object.entries(stats.carsByMarque);
    const maxCount = marques.length > 0 ? Math.max(...marques.map(m => m[1])) : 1;

    return (
        <Container className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold text-dark mb-1">Tableau de Bord</h2>
                    <p className="text-muted small mb-0">Aperçu en temps réel de votre parc automobile</p>
                </div>
                <div className="text-end">
                    <span className="badge bg-light text-dark border py-2 px-3 rounded-pill fw-semibold">
                        Dernière mise à jour: {new Date().toLocaleTimeString()}
                    </span>
                </div>
            </div>

            <Row className="mb-4">
                <Col md={6} lg={4}>
                    <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative" style={{ background: 'linear-gradient(45deg, #0d6efd, #0dcaf0)' }}>
                        <Card.Body className="p-4 text-white">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h6 className="text-uppercase fw-bold mb-2 opacity-75 small">Total Véhicules</h6>
                                    <h2 className="display-5 fw-bold mb-0">{stats.totalCars}</h2>
                                </div>
                                <FontAwesomeIcon icon={faCar} size="3x" className="opacity-25 mt-2" />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={4}>
                    <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative" style={{ background: 'linear-gradient(45deg, #198754, #20c997)' }}>
                        <Card.Body className="p-4 text-white">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h6 className="text-uppercase fw-bold mb-2 opacity-75 small">Valeur du Stock</h6>
                                    <h2 className="display-5 fw-bold mb-0">{stats.totalValue.toLocaleString()} <small className="fs-4">DH</small></h2>
                                </div>
                                <FontAwesomeIcon icon={faDollarSign} size="3x" className="opacity-25 mt-2" />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={12} lg={4}>
                    <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative" style={{ background: 'linear-gradient(45deg, #6610f2, #6f42c1)' }}>
                        <Card.Body className="p-4 text-white">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h6 className="text-uppercase fw-bold mb-2 opacity-75 small">Marques Gérées</h6>
                                    <h2 className="display-5 fw-bold mb-0">{marques.length}</h2>
                                </div>
                                <FontAwesomeIcon icon={faChartPie} size="3x" className="opacity-25 mt-2" />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col lg={8} className="mb-4 mb-lg-0">
                    <Card className="border-0 shadow-sm rounded-4 h-100">
                        <Card.Header className="bg-white border-bottom-0 pt-4 px-4 d-flex align-items-center justify-content-between">
                            <h5 className="fw-bold mb-0"><FontAwesomeIcon icon={faList} className="me-2 text-primary" /> Répartition par Marque</h5>
                        </Card.Header>
                        <Card.Body className="p-4">
                            {marques.length === 0 ? (
                                <div className="text-center py-5">
                                    <FontAwesomeIcon icon={faCar} size="3x" className="text-light mb-3" />
                                    <p className="text-muted">Aucune donnée disponible pour le moment.</p>
                                </div>
                            ) : (
                                marques.map(([marque, count]) => (
                                    <div key={marque} className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="fw-semibold text-dark">{marque}</span>
                                            <span className="text-muted small fw-bold">{count} voiture(s)</span>
                                        </div>
                                        <ProgressBar 
                                            now={(count / stats.totalCars) * 100} 
                                            variant={count === maxCount ? "primary" : "secondary"} 
                                            className="rounded-pill" 
                                            style={{ height: '10px' }} 
                                        />
                                    </div>
                                ))
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card className="border-0 shadow-sm rounded-4 bg-light">
                        <Card.Body className="p-4">
                            <h5 className="fw-bold mb-4">Informations Rapides</h5>
                            <div className="d-flex align-items-start mb-3">
                                <div className="bg-white p-2 rounded-3 shadow-sm me-3">
                                    <FontAwesomeIcon icon={faCar} className="text-primary" />
                                </div>
                                <div>
                                    <p className="mb-0 text-dark fw-semibold">Moyenne par marque</p>
                                    <small className="text-muted">{(stats.totalCars / (marques.length || 1)).toFixed(1)} véhicules</small>
                                </div>
                            </div>
                            <div className="d-flex align-items-start mb-3">
                                <div className="bg-white p-2 rounded-3 shadow-sm me-3">
                                    <FontAwesomeIcon icon={faDollarSign} className="text-success" />
                                </div>
                                <div>
                                    <p className="mb-0 text-dark fw-semibold">Prix moyen</p>
                                    <small className="text-muted">{(stats.totalValue / (stats.totalCars || 1)).toLocaleString()} DH</small>
                                </div>
                            </div>
                            <div className="mt-4 pt-3 border-top">
                                <p className="small text-muted mb-0">Consultez la liste complète pour plus de détails sur chaque véhicule.</p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
