package com.uncle.mydues.business.impl.repositories;

import com.uncle.mydues.domain.utente_gruppo;
import com.uncle.mydues.domain.utente_spesa;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Utente_gruppoRepository extends JpaRepository<utente_gruppo, Long> {

    List<utente_gruppo> findAllByGruppo_Id ( Long gruppo_id);
    List<utente_gruppo> findAll ();
    utente_gruppo  findByUtente_IdAndGruppo_Id(Long id_utente, Long id_gruppo);
    void deleteByGruppo_IdAndUtente_Id(Long id_utente, Long id_gruppo);
}
