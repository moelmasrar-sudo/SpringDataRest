import axios from '../services/api';
import React from 'react';
import { ButtonGroup, Button, Card, Table, Form, InputGroup, Spinner, Badge, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSearch, faTimes, faCar, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import MyToast from './MyToast';

const API_HOST = process.env.REACT_APP_API_HOST || "http://localhost:8080/api";

class VoitureListe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showToast: false,
            voitures: [],
            searchQuery: '',
            isLoading: true,
            showDeleteModal: false,
            voitureToDelete: null
        };
    }

    componentDidMount() {
        this.fetchVoitures();
    }

    fetchVoitures = (search = '') => {
        this.setState({ isLoading: true });
        let url = `${API_HOST}/voitures`;
        if (search) {
            url = `${API_HOST}/voitures/search/findByMarqueContainingIgnoreCaseOrModeleContainingIgnoreCase?marque=${search}&modele=${search}`;
        }
        axios.get(url)
            .then(response => response.data)
            .then(data => {
                const items = Array.isArray(data) ? data : (data && data._embedded && data._embedded.voitures) || [];
                const voitures = items.map((voiture) => {
                    if (voiture && (voiture.id || voiture.id === 0)) return voiture;
                    const selfHref = voiture && voiture._links && voiture._links.self && voiture._links.self.href;
                    const id = selfHref ? selfHref.split("/").pop() : undefined;
                    return { ...voiture, id };
                });
                this.setState({ voitures, isLoading: false });
            })
            .catch(error => {
                console.error("ERROR : " + error);
                this.setState({ isLoading: false });
            });
    }

    handleShowDeleteModal = (voitureId) => {
        this.setState({ showDeleteModal: true, voitureToDelete: voitureId });
    }

    handleCloseDeleteModal = () => {
        this.setState({ showDeleteModal: false, voitureToDelete: null });
    }

    confirmDelete = () => {
        const voitureId = this.state.voitureToDelete;
        axios.delete(`${API_HOST}/voitures/` + voitureId)
            .then(response => {
                this.setState({
                    voitures: this.state.voitures.filter(v => v.id !== voitureId),
                    showToast: true,
                    showDeleteModal: false,
                    voitureToDelete: null
                });
                setTimeout(() => this.setState({ showToast: false }), 3000);
            })
            .catch(err => {
                console.error(err);
                this.handleCloseDeleteModal();
            });
    }

    handleSearchChange = (e) => {
        this.setState({ searchQuery: e.target.value });
    }

    handleSearchSubmit = (e) => {
        e.preventDefault();
        this.fetchVoitures(this.state.searchQuery);
    }

    clearSearch = () => {
        this.setState({ searchQuery: '' });
        this.fetchVoitures();
    }

    render() {
        const { navigate } = this.props;
        const { voitures, isLoading, searchQuery, showDeleteModal, showToast } = this.state;

        return (
            <div className="py-4">
                <MyToast show={showToast} message={"Voiture supprimée avec succès."} type="danger" />
                
                <Card className="border-0 shadow-sm rounded-3 overflow-hidden">
                    <Card.Header className="bg-white text-dark fw-bold py-3 px-4 border-bottom-0 d-flex justify-content-between align-items-center">
                        <span className="fs-5"><FontAwesomeIcon icon={faCar} className="me-2 text-primary" /> Inventaire</span>
                        <Form onSubmit={this.handleSearchSubmit} className="d-flex">
                            <InputGroup size="sm" className="shadow-sm rounded-pill overflow-hidden">
                                <Form.Control
                                    type="text"
                                    placeholder="Rechercher marque/modèle..."
                                    value={searchQuery}
                                    onChange={this.handleSearchChange}
                                    className="border-0 bg-light px-3"
                                    style={{ boxShadow: 'none' }}
                                />
                                {searchQuery && (
                                    <Button variant="light" type="button" onClick={this.clearSearch} className="border-0 text-muted">
                                        <FontAwesomeIcon icon={faTimes} />
                                    </Button>
                                )}
                                <Button variant="primary" type="submit" className="border-0 px-3">
                                    <FontAwesomeIcon icon={faSearch} />
                                </Button>
                            </InputGroup>
                        </Form>
                    </Card.Header>

                    <Card.Body className="p-0">
                        <div className="table-responsive">
                            <Table hover className="align-middle mb-0 text-center">
                                <thead className="bg-light text-muted">
                                <tr>
                                    <th className="py-3 fw-semibold">Marque</th>
                                    <th className="py-3 fw-semibold">Modèle</th>
                                    <th className="py-3 fw-semibold">Couleur</th>
                                    <th className="py-3 fw-semibold">Immatricule</th>
                                    <th className="py-3 fw-semibold">Année</th>
                                    <th className="py-3 fw-semibold">Prix</th>
                                    <th className="py-3 fw-semibold">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-5">
                                            <Spinner animation="border" variant="primary" />
                                            <div className="mt-2 text-muted fw-semibold">Chargement des véhicules...</div>
                                        </td>
                                    </tr>
                                ) : voitures.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-5">
                                            <div className="text-muted mb-2"><FontAwesomeIcon icon={faCar} size="3x" className="opacity-25" /></div>
                                            <div className="fw-semibold opacity-75">Aucune voiture n'est disponible</div>
                                        </td>
                                    </tr>
                                ) : (
                                    voitures.map((voiture) => (
                                        <tr key={voiture.id} className="bg-white">
                                            <td className="fw-bold">{voiture.marque}</td>
                                            <td>{voiture.modele}</td>
                                            <td><Badge bg="secondary" className="fw-normal">{voiture.couleur}</Badge></td>
                                            <td className="text-muted"><small>{voiture.immatricule}</small></td>
                                            <td>{voiture.annee}</td>
                                            <td className="fw-semibold text-success">{voiture.prix.toLocaleString()} DH</td>
                                            <td>
                                                <ButtonGroup>
                                                    <Button size="sm" variant="light" className="text-primary border shadow-sm" onClick={() => navigate("/edit/" + voiture.id)}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>
                                                    <Button size="sm" variant="light" className="text-danger border shadow-sm ms-1" onClick={() => this.handleShowDeleteModal(voiture.id)}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </Table>
                        </div>
                    </Card.Body>
                </Card>

                {/* Delete Confirmation Modal */}
                <Modal show={showDeleteModal} onHide={this.handleCloseDeleteModal} centered backdrop="static" keyboard={false}>
                    <Modal.Header closeButton className="border-0 pb-0">
                        <Modal.Title className="text-danger">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
                            Confirmation de suppression
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="py-3">
                        <p className="mb-0">Êtes-vous sûr de vouloir supprimer ce véhicule ? Cette action est irréversible.</p>
                    </Modal.Body>
                    <Modal.Footer className="border-0 pt-0">
                        <Button variant="outline-secondary" onClick={this.handleCloseDeleteModal}>
                            Annuler
                        </Button>
                        <Button variant="danger" onClick={this.confirmDelete} className="px-4">
                            Supprimer
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const VoitureListeWrapper = () => {
    const navigate = useNavigate();
    return <VoitureListe navigate={navigate} />;
};

export default VoitureListeWrapper;