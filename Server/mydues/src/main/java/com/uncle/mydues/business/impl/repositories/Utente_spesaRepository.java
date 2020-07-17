package com.uncle.mydues.business.impl.repositories;

import com.uncle.mydues.domain.utente_spesa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Utente_spesaRepository extends JpaRepository<utente_spesa, Long> {

    List<utente_spesa> findAllByUtente_Id(Long id_utente);
    List<utente_spesa> findBySpesa_Gruppo_IdAndSpesaDeleted(Long i, boolean deleted);
    List<utente_spesa> findAllBySpesa_Id(Long id_spesa);


}
