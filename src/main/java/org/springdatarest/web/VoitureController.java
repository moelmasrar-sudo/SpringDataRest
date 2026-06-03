package org.springdatarest.web;

import org.springdatarest.modele.Proprietaire;
import org.springdatarest.modele.ProprietaireRepo;
import org.springdatarest.modele.Voiture;
import org.springdatarest.modele.VoitureRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Optional;

@RestController
@CrossOrigin(
    origins = {"http://localhost:3000", "http://127.0.0.1:3000"},
    allowedHeaders = "*",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS}
)
@RequestMapping("/api/voitures")
public class VoitureController {

    @Autowired
    private VoitureRepo voitureRepo;
    @Autowired
    private ProprietaireRepo proprietaireRepo;

    @GetMapping
    public Iterable<Voiture> getVoitures() {
        return voitureRepo.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Voiture> getVoitureById(@PathVariable Long id) {
        return voitureRepo.findById(id);
    }

    @PostMapping
    public Voiture saveVoiture(@RequestBody Voiture voiture) {
        System.out.println(voiture);
        Optional<Proprietaire> proprietaire = proprietaireRepo.findById(voiture.getProprietaire().getId());
        proprietaire.ifPresent(voiture::setProprietaire);
        return voitureRepo.save(voiture);
    }

    @PutMapping("/{id}")
    public Voiture updateVoiture(
            @PathVariable Long id,
            @RequestBody Voiture voiture
    ) {

        Voiture voitureDB = voitureRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Voiture non trouvée"));

        voitureDB.setMarque(voiture.getMarque());
        voitureDB.setModele(voiture.getModele());
        voitureDB.setCouleur(voiture.getCouleur());
        voitureDB.setImmatricule(voiture.getImmatricule());
        voitureDB.setPrix(voiture.getPrix());
        voitureDB.setAnnee(voiture.getAnnee());

        if (voiture.getProprietaire() != null) {
            Optional<Proprietaire> proprietaire = proprietaireRepo.findById(voiture.getProprietaire().getId());
            proprietaire.ifPresent(voitureDB::setProprietaire);
        }

        return voitureRepo.save(voitureDB);
    }

    @DeleteMapping("/{id}")
    public String deleteVoiture(@PathVariable Long id) {

        voitureRepo.deleteById(id);

        return "Voiture supprimée avec succès";
    }
}