import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUndo, faCar, faPlus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Form, Button, Card, Row, Col, Container, InputGroup, Modal } from "react-bootstrap";
import MyToast from "./MyToast";
import axios from '../services/api';

const API_HOST = process.env.REACT_APP_API_HOST || "http://localhost:8080/api";

class Voiture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.initialState,
            showOwnerModal: false,
            newOwner: { nom: '', prenom: '' }
        };
        this.voitureChange = this.voitureChange.bind(this);
        this.submitVoiture = this.submitVoiture.bind(this);
    }
    
    initialState = {
        showSuccessToast: false,
        successMessage: '',
        marque: '',
        modele: '',
        couleur: '',
        immatricule: '',
        prix: '',
        annee: '',
        proprietaireId: '',
        proprietaires: []
    }

    componentDidMount() {
        this.fetchProprietaires();
    }

    fetchProprietaires = (newId = null) => {
        axios.get('/proprietaires')
            .then(response => {
                const data = response.data;
                const items = Array.isArray(data) ? data : (data && data._embedded && data._embedded.proprietaires) || [];
                const uniqueProprietaires = [];
                const seenIds = new Set();
                items.forEach(p => {
                    const selfHref = p && p._links && p._links.self && p._links.self.href;
                    const id = selfHref ? selfHref.split("/").pop() : undefined;
                    if (id && !seenIds.has(id)) {
                        seenIds.add(id);
                        uniqueProprietaires.push({ ...p, id });
                    }
                });
                this.setState({ 
                    proprietaires: uniqueProprietaires, 
                    proprietaireId: newId || (uniqueProprietaires.length > 0 ? (this.state.proprietaireId || uniqueProprietaires[0].id) : '') 
                });
            })
            .catch(error => console.error("ERROR fetching owners: " + error));
    }

    resetVoiture = () => {
        this.setState(() => ({
            ...this.initialState,
            proprietaires: this.state.proprietaires,
            proprietaireId: this.state.proprietaires.length > 0 ? this.state.proprietaires[0].id : ''
        }));
    }

    submitVoiture = (event) => {
        event.preventDefault();

        // Find the full owner object from our state list
        const selectedProprietaire = this.state.proprietaires.find(p => p.id === this.state.proprietaireId);

        const voiture = {
            marque: this.state.marque,
            modele: this.state.modele,
            couleur: this.state.couleur,
            immatricule: this.state.immatricule,
            annee: parseInt(this.state.annee),
            prix: parseInt(this.state.prix),
            proprietaire: selectedProprietaire // Sending the full object
        };

        axios.post('/voitures', voiture)
            .then(response => {
                if (response.data != null) {
                    this.setState({ ...this.initialState, proprietaires: this.state.proprietaires, proprietaireId: this.state.proprietaires.length > 0 ? this.state.proprietaires[0].id : '', showSuccessToast: true, successMessage: "Voiture ajoutée avec succès." });
                    setTimeout(() => this.setState({ showSuccessToast: false }), 3000);
                }
            })
            .catch(error => {
                console.error("Failed to add car", error);
                alert("Erreur lors de l'ajout : " + (error.response?.data?.message || error.message));
            });
    };

    voitureChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleOwnerModalShow = () => this.setState({ showOwnerModal: true });
    handleOwnerModalClose = () => this.setState({ showOwnerModal: false, newOwner: { nom: '', prenom: '' } });

    handleNewOwnerChange = (e) => {
        this.setState({
            newOwner: { ...this.state.newOwner, [e.target.name]: e.target.value }
        });
    }

    submitNewOwner = (e) => {
        e.preventDefault();
        axios.post('/proprietaires', this.state.newOwner)
            .then(response => {
                const selfHref = response.data && response.data._links && response.data._links.self && response.data._links.self.href;
                const newId = selfHref ? selfHref.split("/").pop() : null;
                this.fetchProprietaires(newId);
                this.handleOwnerModalClose();
            })
            .catch(err => {
                console.error("Failed to create owner", err);
                alert("Erreur lors de la création du propriétaire.");
            });
    }

    render() {
        const { showOwnerModal, newOwner } = this.state;

        return (
            <Container className="py-4">
                <MyToast show={this.state.showSuccessToast} message={this.state.successMessage} />
                <Row className="justify-content-center">
                    <Col md={10} lg={8}>
                        <Card className="border-0 shadow-sm rounded-3">
                            <Card.Header className="bg-white border-bottom-0 pt-4 px-4">
                                <h4 className="fw-bold mb-0 text-dark">
                                    <FontAwesomeIcon icon={faCar} className="me-2 text-primary" />
                                    Ajouter une Nouvelle Voiture
                                </h4>
                                <p className="text-muted small mt-2 mb-0">Remplissez les informations ci-dessous pour enregistrer un nouveau véhicule dans l'inventaire.</p>
                            </Card.Header>

                            <Form onReset={this.resetVoiture} onSubmit={this.submitVoiture} className="p-4">
                                <Card.Body className="p-0">
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="6" controlId="formGridMarque">
                                            <Form.Label className="fw-semibold small text-uppercase">Marque</Form.Label>
                                            <Form.Control required name="marque" placeholder="Ex: Toyota" value={this.state.marque} className="bg-light border-0" onChange={this.voitureChange} />
                                        </Form.Group>

                                        <Form.Group as={Col} md="6" controlId="formGridModele">
                                            <Form.Label className="fw-semibold small text-uppercase">Modèle</Form.Label>
                                            <Form.Control required name="modele" placeholder="Ex: Corolla" value={this.state.modele} className="bg-light border-0" onChange={this.voitureChange} />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="4" controlId="formGridCouleur">
                                            <Form.Label className="fw-semibold small text-uppercase">Couleur</Form.Label>
                                            <Form.Control required name="couleur" placeholder="Ex: Blanc" value={this.state.couleur} className="bg-light border-0" onChange={this.voitureChange} />
                                        </Form.Group>

                                        <Form.Group as={Col} md="4" controlId="formGridImmatricule">
                                            <Form.Label className="fw-semibold small text-uppercase">Immatricule</Form.Label>
                                            <Form.Control required name="immatricule" placeholder="Ex: 1234-A-1" value={this.state.immatricule} className="bg-light border-0" onChange={this.voitureChange} />
                                        </Form.Group>

                                        <Form.Group as={Col} md="4" controlId="formGridAnnee">
                                            <Form.Label className="fw-semibold small text-uppercase">Année</Form.Label>
                                            <Form.Control required name="annee" type="number" placeholder="Ex: 2022" value={this.state.annee} className="bg-light border-0" onChange={this.voitureChange} />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-4">
                                        <Form.Group as={Col} md="6" controlId="formGridPrix">
                                            <Form.Label className="fw-semibold small text-uppercase">Prix (DH)</Form.Label>
                                            <Form.Control required name="prix" type="number" placeholder="Ex: 150000" value={this.state.prix} className="bg-light border-0" onChange={this.voitureChange} />
                                        </Form.Group>

                                        <Form.Group as={Col} md="6" controlId="formGridProprietaire">
                                            <Form.Label className="fw-semibold small text-uppercase">Propriétaire</Form.Label>
                                            <InputGroup>
                                                <Form.Select required name="proprietaireId" value={this.state.proprietaireId} className="bg-light border-0" onChange={this.voitureChange}>
                                                    <option value="">Sélectionner...</option>
                                                    {this.state.proprietaires.map(p => (
                                                        <option key={p.id} value={p.id}>{p.nom} {p.prenom}</option>
                                                    ))}
                                                </Form.Select>
                                                <Button variant="outline-primary" className="border-0" onClick={this.handleOwnerModalShow} title="Ajouter un propriétaire">
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </Button>
                                            </InputGroup>
                                        </Form.Group>
                                    </Row>

                                    <div className="d-flex justify-content-end gap-2 border-top pt-4 mt-2">
                                        <Button type="reset" variant="outline-secondary" className="px-4">
                                            <FontAwesomeIcon icon={faUndo} className="me-2" /> Réinitialiser
                                        </Button>
                                        <Button type="submit" variant="primary" className="px-4">
                                            <FontAwesomeIcon icon={faSave} className="me-2" /> Enregistrer
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Form>
                        </Card>
                    </Col>
                </Row>

                {/* New Owner Modal */}
                <Modal show={showOwnerModal} onHide={this.handleOwnerModalClose} centered>
                    <Modal.Header closeButton className="border-0 pb-0">
                        <Modal.Title className="fw-bold">
                            <FontAwesomeIcon icon={faUserPlus} className="me-2 text-primary" />
                            Nouveau Propriétaire
                        </Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.submitNewOwner}>
                        <Modal.Body className="py-4">
                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-bold text-uppercase">Nom</Form.Label>
                                <Form.Control required name="nom" value={newOwner.nom} onChange={this.handleNewOwnerChange} className="bg-light border-0" placeholder="Entrez le nom" />
                            </Form.Group>
                            <Form.Group className="mb-0">
                                <Form.Label className="small fw-bold text-uppercase">Prénom</Form.Label>
                                <Form.Control required name="prenom" value={newOwner.prenom} onChange={this.handleNewOwnerChange} className="bg-light border-0" placeholder="Entrez le prénom" />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer className="border-0 pt-0">
                            <Button variant="light" onClick={this.handleOwnerModalClose}>Annuler</Button>
                            <Button variant="primary" type="submit" className="px-4">Ajouter</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </Container>
        );
    }
}

export default Voiture;