package com.uncle.mydues.business.impl.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uncle.mydues.domain.Utente;

public interface UtenteRepository extends JpaRepository<Utente, Long> {

    Utente findByUsername(String username);
    Utente findAllById(long id);
}
