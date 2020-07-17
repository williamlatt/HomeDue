package com.uncle.mydues.api;


import com.uncle.mydues.business.MyDuesService;
import com.uncle.mydues.business.impl.repositories.Utente_gruppoRepository;
import com.uncle.mydues.common.Utility;
import com.uncle.mydues.common.spring.security.CodeGenerator;
import com.uncle.mydues.domain.Gruppo;
import com.uncle.mydues.domain.Utente;
import com.uncle.mydues.domain.utente_gruppo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gruppo")
public class RESTGruppoController {

    @Autowired
    private MyDuesService service;

    @GetMapping()
    public List<Gruppo> list(){
        Utente utente = Utility.getUtente();
        return service.findAllGruppo(utente);
    }
    @PostMapping("/singolo")
    public Gruppo singolo(@RequestBody int gruppo){
        return service.getGruppoById(Long.valueOf(gruppo));
    }
    @PostMapping("/register")
    public void register(@RequestBody Gruppo gruppo){
        Utente utente = Utility.getUtente();
        String randomCode = CodeGenerator.getAlphaNumericString(4);
        gruppo.setCodice(randomCode);
        service.saveGruppo(utente,gruppo);
    }
    @PostMapping("/id")
    public Gruppo findGruppo(@RequestBody Long id)
    {
        return  service.getGruppoById(id);
    }



}
