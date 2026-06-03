package org.springdatarest.web;

import org.springdatarest.modele.Voiture;
import org.springdatarest.modele.VoitureRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
public class StatsController {

    @Autowired
    private VoitureRepo voitureRepo;

    @GetMapping
    public Map<String, Object> getDashboardStats() {
        Iterable<Voiture> voitures = voitureRepo.findAll();
        long totalCars = 0;
        long totalValue = 0;
        Map<String, Integer> carsByMarque = new HashMap<>();

        for (Voiture v : voitures) {
            totalCars++;
            totalValue += v.getPrix();
            carsByMarque.put(v.getMarque(), carsByMarque.getOrDefault(v.getMarque(), 0) + 1);
        }

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalCars", totalCars);
        stats.put("totalValue", totalValue);
        stats.put("carsByMarque", carsByMarque);

        return stats;
    }
}
