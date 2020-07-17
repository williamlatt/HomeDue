package com.uncle.mydues.business.impl;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.uncle.mydues.business.MyDuesService;
import com.uncle.mydues.business.impl.repositories.*;
import com.uncle.mydues.domain.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.uncle.mydues.business.BusinessException;
import com.uncle.mydues.business.impl.repositories.Utente_gruppoRepository;

@Service
@Transactional
public class MyDuesServiceImpl implements MyDuesService {

    @Autowired
    private UtenteRepository utenteRepository;
    @Autowired
    private GruppoRepository gruppoRepository;
    @Autowired
    private Utente_gruppoRepository ugRepository;
    @Autowired
    private SpesaRepository spesaRepository;
    @Autowired
    private Utente_spesaRepository utente_spesaRepository;
    @Autowired
    private Utente_gruppoRepository utente_gruppoRepository;
    @Autowired
   private FeedRepository feedRepository;

    @Override
    public List<utente_gruppo> findAllUtenteGruppoByGruppo (Long id) throws  BusinessException{
        return ugRepository.findAllByGruppo_Id(id);
    }
    @Override
    public List<utente_gruppo> findAll() throws  BusinessException{
        return ugRepository.findAll();
    }
    @Override
    public utente_gruppo updateUtente_gruppo(utente_spesa us) throws BusinessException{
        utente_gruppo uug;
        uug = utente_gruppoRepository.findByUtente_IdAndGruppo_Id(us.getUtente().getId(), us.getSpesa().getGruppo().getId());
        uug.setSaldo(uug.getSaldo() + us.getImporto());
        utente_gruppoRepository.deleteByGruppo_IdAndUtente_Id(us.getUtente().getId(),us.getSpesa().getGruppo().getId());
        return uug;
    }
    @Override
    public utente_gruppo updateDeleteUtente_gruppo(utente_spesa us) throws BusinessException{
        utente_gruppo uug;
        uug = utente_gruppoRepository.findByUtente_IdAndGruppo_Id(us.getUtente().getId(), us.getSpesa().getGruppo().getId());
            uug.setSaldo(uug.getSaldo() - us.getImporto());
        utente_gruppoRepository.deleteByGruppo_IdAndUtente_Id(us.getUtente().getId(),us.getSpesa().getGruppo().getId());
        return uug;
    }

    @Override
    public Spesa deleteSpesa(Spesa spesa) throws BusinessException{
        spesa.setDeleted(true);
        Feed feed = new Feed();
        Date date = new Date(System.currentTimeMillis());
        feed.setDataPubblicazione(date);
        feed.setSpesa(spesa);
        feed.setNote("Delete");
        feedRepository.save(feed);
        spesaRepository.delete(spesa);
        return spesa;
    }
    @Override
    public Spesa deleteSpesa2 (Spesa spesa) throws BusinessException{
        spesaRepository.delete(spesa);
        return spesa;
    }
    @Override
    public void deleteSaldo (Spesa spesa) throws BusinessException{
        spesaRepository.delete(spesa);
    }
    @Override
    public Spesa restoreSpesa(Spesa spesa, Long id_feed) throws BusinessException{
        spesa.setDeleted(false);
        feedRepository.deleteById(id_feed);
        //spesaRepository.delete(spesa);
        return spesa;
    }
    @Override
    public Spesa manageSaldo(Spesa spesa, boolean acc , Long id_feed) throws BusinessException{
        if(acc){
            spesa.setAccettata(true);
            feedRepository.deleteById(id_feed);
            return spesa;
        } else {
            return spesa;
        }
    }

    @Override
    public List<Feed> findAllFeed() throws BusinessException{
        return feedRepository.findAll();
    }

    @Override
    public Utente findUtenteByUsername(String username) throws BusinessException {
        return utenteRepository.findByUsername(username);
    }
    @Override
    public void signup ( Utente utente){
        utenteRepository.save(utente);
    }

    @Override
    public void saveGruppo (Utente utente, Gruppo gruppo){
        gruppoRepository.save(gruppo);
        utente_gruppo ug = new utente_gruppo();
        ug.setUtente(utente);
        ug.setGruppo(gruppo);
        ug.setSaldo(0);
        utente_gruppoRepository.save(ug);
    }

    @Override
    public Gruppo findAllGruppoByCodice(String a) throws BusinessException{
     return gruppoRepository.findGruppoByCodice(a);
    }

    @Override
    public void saveUtente_Gruppo(utente_gruppo ug) throws BusinessException{
        utente_gruppoRepository.save(ug);
    }

    @Override
    public List<Gruppo> findAllGruppo(Utente utente) throws BusinessException {return gruppoRepository.findGruppoByUtente_gruppo_utente_id(utente.getId());}

    @Override
    public List<utente_spesa> findAllSpesaUtente(Utente utente) throws BusinessException{
        return utente_spesaRepository.findAllByUtente_Id(utente.getId()); }

    @Override
    public List<utente_spesa> findAllSpesaGruppo(Long id) throws BusinessException{
        return utente_spesaRepository.findBySpesa_Gruppo_IdAndSpesaDeleted(id , false);
    }
    @Override
    public List<Spesa> findAllSpesaGruppo2(Long id) throws BusinessException{
        return spesaRepository.findSpesevisualizzabili(id, false , false, false,  false , true, true);
    }
    @Override
    public utente_gruppo findAllGruppoUtente_id(Utente utente, Gruppo gruppo) throws BusinessException{
        return utente_gruppoRepository.findByUtente_IdAndGruppo_Id(gruppo.getId(),utente.getId());
    }
    @Override
    public Gruppo getGruppoById(Long id) throws BusinessException{
        return gruppoRepository.findGruppoById(id);
    }
    @Override
    public void addUtenti_spese( List<utente_spesa> a) throws BusinessException{
        utente_spesaRepository.saveAll(a);
    }
    @Override
    public void saveSpesa (Spesa spesa) throws BusinessException{
        spesaRepository.save(spesa);
    }
    @Override
    public List<utente_spesa> findAllSpesa_id(Long id_spesa) throws BusinessException{
         return utente_spesaRepository.findAllBySpesa_Id(id_spesa);
    }
    @Override
    public Spesa deleteUtente_spesa(List<utente_spesa> us, Feed feed ) throws BusinessException{
        utente_spesaRepository.deleteInBatch(us);
        feedRepository.deleteById(feed.getId());
        return feed.getSpesa();
    }
    @Override
    public Utente findUtenteById(Long id) throws BusinessException{
       return utenteRepository.findAllById(id);
    }
    @Override
    public void saveUtente_Spesa(utente_spesa us) throws BusinessException{
         utente_spesaRepository.save(us);
    }
    @Override
    public void saveFeed(Feed feed) throws BusinessException{
        feedRepository.save(feed);
    }


    /*@Override
    public List<Gruppo> findAllGruppo() throws BusinessException{
        return gruppoRepository.findAll(JpaSort.unsafe(Direction.ASC, "nome"));
    }

    @Override
    public List<Gruppo> findAllGruppoByUtente(Utente utente) throws BusinessException{
        System.out.println("------------------------"+ utente.getId()+"---------------------------");
        return gruppoRepository.findGruppoByUtente(utente.getId());
    }
/*
    @Override
    public Utente updateProfilo(Utente profilo) throws BusinessException {
        Utente utente = utenteRepository.findByUsername(profilo.getUsername());
        utente.setEmail(profilo.getEmail());
        utente.setTelefono(profilo.getTelefono());
        return utente;
    }

    @Override
    public List<Insegnamento> findAllInsegnamenti(Utente utente) throws BusinessException {
        return insegnamentoRepository.findInsegnamentiByDocenteId(utente.getId(), JpaSort.unsafe(Direction.ASC, "denominazione"));
    }

    @Override
    public List<Appello> findAllAppelli(long idInsegnamento) throws BusinessException {
        return appelloRepository.findAppelliByInsegnamentoId(idInsegnamento);
    }

    @Override
    public void createAppello(Appello appello) throws BusinessException {
        appelloRepository.save(appello);
    }

    @Override
    public Appello findAppelloById(long idAppello) throws BusinessException {
        return appelloRepository.findById(idAppello).get();
    }

    @Override
    public void updateAppello(Appello appello) throws BusinessException {
        appelloRepository.save(appello);
    }

    @Override
    public void deleteAppello(long idAppello) throws BusinessException {
        appelloRepository.deleteById(idAppello);

    }
*/
}
