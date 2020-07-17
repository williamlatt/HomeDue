package com.uncle.mydues.api;

import com.uncle.mydues.business.MyDuesService;
import com.uncle.mydues.business.impl.repositories.Utente_gruppoRepository;
import com.uncle.mydues.common.Utility;
import com.uncle.mydues.domain.Gruppo;
import com.uncle.mydues.domain.Utente;
import com.uncle.mydues.domain.utente_gruppo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.RequestResponseBodyMethodProcessor;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/utente_gruppo")
public class RESTutente_gruppoController {


    @Autowired
    private MyDuesService service;

    @PostMapping
    public List<utente_gruppo> list(@RequestBody Long id) {
        Utente utente = Utility.getUtente();
        return service.findAllUtenteGruppoByGruppo(id);
    }
    @GetMapping("/all")
    public List<utente_gruppo> listByUtente() {
        Utente utente = Utility.getUtente();
        return service.findAll();
    }

    @PostMapping("/join")
    public ResponseEntity<String> joinGroup(@RequestBody String a) {
        Gruppo gruppo = new Gruppo();
        gruppo= service.findAllGruppoByCodice(a);

        if (gruppo  != null) {
            gruppo = service.findAllGruppoByCodice(a);
            Utente utente = Utility.getUtente();
            utente_gruppo ug = new utente_gruppo();
            ug.setGruppo(gruppo);
            ug.setUtente(utente);
            ug.setSaldo(0);

            utente_gruppo ul;
            ul = service.findAllGruppoUtente_id(utente, gruppo);
            if(ul == null){
                service.saveUtente_Gruppo(ug);
            return null;
        }
        else return new ResponseEntity<>(
                    "ErroreGiaDentro",
                    HttpStatus.OK);
        } else
            return new ResponseEntity<>(
                    "Errore",
                    HttpStatus.OK);

    }
}
