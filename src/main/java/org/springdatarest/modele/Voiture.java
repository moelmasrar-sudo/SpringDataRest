package org.springdatarest.modele;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
public class Voiture {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String marque;
    private String modele;
    private String couleur;
    private String immatricule;
    private int annee;
    private int prix;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proprietaire")
    private Proprietaire proprietaire;

    public Voiture(String marque, String modele, String couleur, String immatricule, int annee, int prix, Proprietaire proprietaire) {
        this.marque = marque;
        this.modele = modele;
        this.couleur = couleur;
        this.immatricule = immatricule;
        this.annee = annee;
        this.prix = prix;
        this.proprietaire = proprietaire;
    }
}
