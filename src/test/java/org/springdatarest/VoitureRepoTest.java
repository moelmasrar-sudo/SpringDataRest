package org.springdatarest;

import org.junit.jupiter.api.Test;
import org.springdatarest.modele.Proprietaire;
import org.springdatarest.modele.ProprietaireRepo;
import org.springdatarest.modele.Voiture;
import org.springdatarest.modele.VoitureRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jpa.test.autoconfigure.TestEntityManager;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class VoitureRepoTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private VoitureRepo voitureRepo;
    @Autowired
    private ProprietaireRepo proprietaireRepo;

    @Test
    public void ajouterVoiture() {
        Proprietaire proprietaire = new Proprietaire("TestNom", "TestPrenom");

        testEntityManager.persistAndFlush(proprietaire);
        assertThat(proprietaire.getId()).isNotNull();

        Voiture voiture = new Voiture(
                "MiolaCar",
                "Uber",
                "Blanche",
                "M-2020",
                2021,
                180000,
                proprietaire
        );

        testEntityManager.persistAndFlush(voiture);

        assertThat(voiture.getId()).isNotNull();
    }

    @Test
    public void supprimerVoiture() {
        Proprietaire proprietaire = new Proprietaire("TestNom", "TestPrenom");

        testEntityManager.persistAndFlush(proprietaire);
        assertThat(proprietaire.getId()).isNotNull();

        testEntityManager.persistAndFlush(
                new Voiture(
                        "MiolaCar",
                        "Uber",
                        "Blanche",
                        "M-2020",
                        2021,
                        180000,
                        proprietaire
                )
        );

        testEntityManager.persistAndFlush(
                new Voiture(
                        "MiniCooper",
                        "Uber",
                        "Rouge",
                        "C-2020",
                        2021,
                        180000,
                        proprietaire
                )
        );

        voitureRepo.deleteAll();

        assertThat(voitureRepo.findAll()).isEmpty();
    }
}