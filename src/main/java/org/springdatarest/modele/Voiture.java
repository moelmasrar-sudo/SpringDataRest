package org.springdatarest.modele;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class Voiture {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @NonNull
    private String marque;
    @NonNull
    private String modele;
    @NonNull
    private String couleur;
    @NonNull
    private String immatricule;
    @NonNull
    private int annee;
    @NonNull
    private int prix;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proprietaire")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NonNull
    private Proprietaire proprietaire;
}
