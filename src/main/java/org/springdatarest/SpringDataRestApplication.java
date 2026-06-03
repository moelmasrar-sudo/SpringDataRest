package org.springdatarest;

import org.springdatarest.modele.AppUser;
import org.springdatarest.modele.AppUserRepo;
import org.springdatarest.modele.Proprietaire;
import org.springdatarest.modele.ProprietaireRepo;
import org.springdatarest.modele.VoitureRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springdatarest.modele.Voiture;

@SpringBootApplication
public class SpringDataRestApplication {
    @Autowired
    private ProprietaireRepo proprietaireRepo;

    @Autowired
    private AppUserRepo appUserRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(SpringDataRestApplication.class, args);
	}

    @Bean
    CommandLineRunner runner(VoitureRepo repository) {
        return args -> {
            Proprietaire proprietaire1 = new Proprietaire("Ali" , "Hassan");
            Proprietaire proprietaire2 = new Proprietaire("Najat" , "Bani");
            proprietaireRepo.save(proprietaire1);
            proprietaireRepo.save(proprietaire2);
            repository.save(new Voiture("Toyota", "Corolla", "Grise", "A-1-9090", 2018, 95000,
                    proprietaire1));
            repository.save(new Voiture("Ford", "Fiesta", "Rouge", "A-2-8090", 2015, 90000,
                    proprietaire1));
            repository.save(new Voiture("Honda", "CRV", "Bleu", "A-3-7090", 2016, 140000,
                    proprietaire2));

            // Create users: user/user, admin/admin
            appUserRepo.save(new AppUser(null, "user", passwordEncoder.encode("user"), "USER"));
            appUserRepo.save(new AppUser(null, "admin", passwordEncoder.encode("admin"), "ADMIN"));
        };
    }
}

