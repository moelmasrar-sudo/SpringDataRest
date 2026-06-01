package org.springdatarest.modele;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public interface VoitureRepo extends CrudRepository<Voiture, Long> {

    List<Voiture> findByModele(@Param("modele") String modele);
    List<Voiture> findByCouleur(@Param("couleur") String couleur);
    List<Voiture> findByMarque(String marque);
    List<Voiture> findByAnnee(int annee);
    List<Voiture> findByMarqueAndModele(String marque, String modele);
    List<Voiture> findByMarqueOrCouleur(String marque, String couleur);
    List<Voiture> findByMarqueOrderByAnneeAsc(String marque);
//    @Query("select v from Voiture v where v.marque = ?1")
//    List<Voiture> findByMarque(String marque);
    @Query("select v from Voiture v where v.marque like %?1")
    List<Voiture> findByMarqueEndsWith(String marque);
}
