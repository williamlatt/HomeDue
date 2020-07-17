package com.uncle.mydues.api;

import com.uncle.mydues.business.MyDuesService;
import com.uncle.mydues.common.Utility;
import com.uncle.mydues.domain.Utente;
import com.uncle.mydues.domain.utente_spesa;
import com.uncle.mydues.domain.Spesa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/utente_spesa")
public class RESTutente_spesaController {
    @Autowired
    private MyDuesService service;
    @PostMapping
    public List<utente_spesa> list(@RequestBody Long id){
        return service.findAllSpesaGruppo(id);
    }


}
