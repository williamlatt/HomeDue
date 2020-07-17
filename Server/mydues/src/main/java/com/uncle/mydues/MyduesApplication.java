package com.uncle.mydues;

import com.uncle.mydues.business.impl.repositories.*;
import com.uncle.mydues.domain.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
@EntityScan(basePackages = {"com.uncle.mydues.domain"})
@SpringBootApplication
public class MyduesApplication {
    @Autowired
    private PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(MyduesApplication.class, args);


    }
    @Bean
    public CommandLineRunner loadData(UtenteRepository utenteRepository, GruppoRepository gruppoRepository, Utente_gruppoRepository ugRepository, SpesaRepository spesaRepository, Utente_spesaRepository utente_spesaRepository, Utente_gruppoRepository utente_gruppoRepository) {
        return (args) -> {/*
            utente_gruppo ug2 = new utente_gruppo();
            Utente p = new Utente();
            Gruppo g2 = new Gruppo();
            p.setNome("Gigi");
            p.setCognome("Buonasera");
            p.setUsername("gigi");
            p.setEmail("gigi@perlaio.com");
            p.setPassword(passwordEncoder.encode("123"));
            g2.setNome("Casa Max Marottoli");
            g2.setCodice("asdf");
            gruppoRepository.save(g2);
            utenteRepository.save(p);
            ug2.setUtente(p);
            ug2.setGruppo(g2);
            ug2.setSaldo(0);
            utente_gruppoRepository.save(ug2);
            utente_gruppoRepository.save(ug2);

            Utente p = new Utente();
            Gruppo g2 = new Gruppo(), g = new Gruppo();
            g.setNome("Casa Max Mariola");
            g.setCodice("123");
            g2.setCodice("234");
            g2.setNome("Tg casa40ena");
            p.setNome("Piero");
            p.setCognome("Pelaio");
            p.setUsername("admin");
            p.setEmail("piero@perlaio.com");
            p.setPassword(passwordEncoder.encode("123"));
            gruppoRepository.save(g);
            gruppoRepository.save(g2);
            utenteRepository.save(p);
            utente_gruppo ug = new utente_gruppo();
            ug.setGruppo(g);
            ug.setUtente(p);
            ug.setSaldo(123);
            utente_gruppo ug2 = new utente_gruppo();
            ug2.setGruppo(g2);
            ug2.setUtente(p);
            ug2.setSaldo(220);
            ugRepository.save(ug2);
            ugRepository.save(ug);

            Spesa s1 = new Spesa(), s2 = new Spesa(), s3 = new Spesa(),s4 = new Spesa();
            s1.setDescrizione("Spesa Conad");
            s2.setDescrizione("Spesa Lidl");
            s3.setDescrizione("Spesa tabacchi");
            s4.setDescrizione("Spesa Manoppello");
            s1.setGruppo(g);
            s2.setGruppo(g);
            s3.setGruppo(g);
            s4.setGruppo(g);
            s1.setImporto(120);
            s2.setImporto(50);
            s3.setImporto(220);
            s4.setImporto(190);
            Date dataPubblicazione = new Date(System.currentTimeMillis());
            s1.setDataPubblicazione(dataPubblicazione);
            s2.setDataPubblicazione(dataPubblicazione);
            s3.setDataPubblicazione(dataPubblicazione);
            s4.setDataPubblicazione(dataPubblicazione);
            spesaRepository.save(s1);
            spesaRepository.save(s2);
            spesaRepository.save(s3);
            spesaRepository.save(s4);
            utente_spesa us1 = new utente_spesa(), us2 = new utente_spesa(), us3 = new utente_spesa(),us4 = new utente_spesa();
            us1.setUtente(p);
            us1.setSpesa(s1);
            us2.setUtente(p);
            us2.setSpesa(s2);
            us3.setUtente(p);
            us3.setSpesa(s3);
            us4.setUtente(p);
            us4.setSpesa(s4);
            utente_spesaRepository.save(us1);
            utente_spesaRepository.save(us2);
            utente_spesaRepository.save(us3);
            utente_spesaRepository.save(us4);

*/
        };
    }

}
