package com.uncle.mydues.business.impl.repositories;
import com.uncle.mydues.domain.Gruppo;
import com.uncle.mydues.domain.Utente;
import com.uncle.mydues.domain.utente_gruppo;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GruppoRepository extends JpaRepository<Gruppo, Long> {
        @Query(value = "SELECT g.* from Gruppo g join utente_gruppo on g.id_gruppo = utente_gruppo.id_gruppo where utente_gruppo.id_utente = ?1", nativeQuery = true)
        List<Gruppo> findGruppoByUtente_gruppo_utente_id(long idUtente);

        Gruppo findGruppoByCodice(String a);
        Gruppo findGruppoById(Long id);
}
