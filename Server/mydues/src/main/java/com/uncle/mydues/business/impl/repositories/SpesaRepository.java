package com.uncle.mydues.business.impl.repositories;

import com.uncle.mydues.domain.Gruppo;
import com.uncle.mydues.domain.Spesa;
import com.uncle.mydues.domain.utente_spesa;
import org.springframework.data.jpa.repository.JpaRepository;
import com.uncle.mydues.business.impl.repositories.Utente_spesaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SpesaRepository extends JpaRepository<Spesa, Long> {

    @Query(value ="select spesa.* from spesa  left outer join gruppo gruppo1_ on spesa.id_gruppo=gruppo1_.id_gruppo where gruppo1_.id_gruppo=?1 and (spesa.deleted=?2 and spesa.accettata=?3 and spesa.richiesta=?4) or (spesa.deleted=?5 and spesa.accettata=?6 and spesa.richiesta=?7) order by spesa.data_pubblicazione desc", nativeQuery = true)
    List<Spesa> findSpesevisualizzabili(Long id, boolean del, boolean acc, boolean req , boolean del2, boolean acc2, boolean req2);

}


