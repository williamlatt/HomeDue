package com.uncle.mydues.business;

import java.util.List;
import java.util.Optional;


import com.uncle.mydues.domain.*;

public interface MyDuesService {

    //Utente Service List
    Utente findUtenteByUsername(String username) throws BusinessException;
    void signup(Utente utente) throws BusinessException;
    Utente findUtenteById(Long id) throws BusinessException;

    //Gruppo Service List
    List<Gruppo> findAllGruppo(Utente utente) throws BusinessException;
    void saveGruppo(Utente utente, Gruppo gruppo) throws BusinessException;
    Gruppo findAllGruppoByCodice(String codice) throws BusinessException;
    Gruppo getGruppoById(Long id) throws BusinessException;

    //Utente_Gruppo Service List
    List<utente_gruppo> findAllUtenteGruppoByGruppo( Long id) throws  BusinessException;
    List<utente_gruppo> findAll() throws  BusinessException;
    void saveUtente_Gruppo(utente_gruppo ug) throws BusinessException;
    utente_gruppo findAllGruppoUtente_id(Utente utente, Gruppo gruppo) throws BusinessException;

    utente_gruppo updateUtente_gruppo (utente_spesa us) throws BusinessException;
    utente_gruppo updateDeleteUtente_gruppo (utente_spesa us) throws BusinessException;


    //Utente_Spesa Service List
    List<utente_spesa> findAllSpesaUtente(Utente utente) throws BusinessException;
    List<utente_spesa> findAllSpesaGruppo(Long i) throws BusinessException;
    List<utente_spesa> findAllSpesa_id(Long id_spesa) throws BusinessException;
    void addUtenti_spese(List<utente_spesa> a) throws BusinessException;
    Spesa deleteUtente_spesa(List<utente_spesa> us, Feed feed) throws BusinessException;
    void saveUtente_Spesa(utente_spesa us) throws BusinessException;

    //Spesa Service List
    List<Spesa> findAllSpesaGruppo2(Long i) throws BusinessException;
    void saveSpesa(Spesa s) throws BusinessException;
    Spesa deleteSpesa(Spesa spesa) throws BusinessException;
    Spesa deleteSpesa2(Spesa spesa) throws BusinessException;
    Spesa restoreSpesa(Spesa spesa, Long id) throws BusinessException;
    Spesa manageSaldo(Spesa spesa, boolean acc, Long id) throws BusinessException;
    void deleteSaldo(Spesa spesa) throws BusinessException;

    //Feed Service List
    List<Feed> findAllFeed() throws BusinessException;
    void saveFeed(Feed feed) throws BusinessException;




}
