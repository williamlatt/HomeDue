package com.uncle.mydues.api;

import com.uncle.mydues.business.MyDuesService;
import com.uncle.mydues.business.impl.repositories.Utente_spesaRepository;
import com.uncle.mydues.common.Utility;
import com.uncle.mydues.domain.*;
import jdk.nashorn.internal.ir.ObjectNode;
import org.json.simple.JSONArray;
import org.json.simple.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParser;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.*;
import javax.xml.bind.DatatypeConverter;
import java.io.*;
import java.lang.reflect.Array;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.lang.reflect.Field;

@RestController
@RequestMapping("/api/spesa")
public class RESTSpesaController {

    @Autowired
    private MyDuesService service;

    @PostMapping("/all")
    public List<Spesa> list(@RequestBody Gruppo gruppo) {

        return service.findAllSpesaGruppo2(gruppo.getId());
    }

    @PostMapping("/add")
    public void addSpesa(@RequestBody List<utente_spesa> risultato) throws IOException {
        Spesa spesa = new Spesa();
        spesa = risultato.get(0).getSpesa();
        if(spesa.getImmagine() != null) {
            String base64String = spesa.getImmagine();
            String[] strings = base64String.split(",");
            String extension;
            switch (strings[0]) {//check image's extension
                case "data:image/jpeg;base64":
                    extension = ".jpeg";
                    break;
                case "data:image/png;base64":
                    extension = ".png";
                    break;
                default://should write cases for more images types
                    extension = ".jpg";
                    break;
            }
            //convert base64 string to binary data
            byte[] data = DatatypeConverter.parseBase64Binary(strings[1]);
            String path = "http:\\\\localhost:63342\\mydues\\src\\main\\java\\com\\uncle\\mydues\\imageDir\\" + spesa.getDescrizione() + extension;
            File file = new File(path);
            try (OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(file))) {
                outputStream.write(data);
            } catch (IOException e) {
                e.printStackTrace();
            }

            spesa.setImmagine("");
            spesa.setLink("localhost:8100/imageDir/" + spesa.getDescrizione() + ".jpg");
        }
        Date dataPubblicazione = new Date(System.currentTimeMillis());
        spesa.setDataPubblicazione(dataPubblicazione);
        service.saveSpesa(spesa);
        for( utente_spesa us : risultato){
            us.setSpesa(spesa);
            service.saveUtente_Gruppo(service.updateUtente_gruppo(us));
        }
        service.addUtenti_spese(risultato);
    }
    @PostMapping("/delete/{gruppo}")
    public void deleteSpesa(@RequestBody Spesa spesa, @PathVariable Long gruppo) {
        List<utente_spesa> ls = service.findAllSpesa_id(spesa.getId());
        for (utente_spesa us : ls) {
            service.saveUtente_Gruppo(service.updateDeleteUtente_gruppo(us));
        }

        service.saveSpesa(service.deleteSpesa(spesa));
        //service.deleteSpesa(spesa);
    }
    @PostMapping("/salda/{acc}")
    public void saldo(@RequestBody Feed feed, @PathVariable boolean acc){
        List<utente_spesa> ls = service.findAllSpesa_id(feed.getSpesa().getId());
        if(acc){
            service.saveSpesa(service.manageSaldo(feed.getSpesa(), acc, feed.getId()));
            for (utente_spesa us : ls) {
                service.saveUtente_Gruppo(service.updateUtente_gruppo(us));
            }
        } else {
            service.deleteSaldo(service.deleteUtente_spesa(ls, feed));

        }

    }

    @PostMapping("/restore")
    public void restoreSpesa(@RequestBody Feed feed){
        Spesa news = service.restoreSpesa(feed.getSpesa(), feed.getId());
        List<utente_spesa> ls = service.findAllSpesa_id(news.getId());
        for (utente_spesa us : ls) {
            service.saveUtente_Gruppo(service.updateUtente_gruppo(us));
        }
        news.setId(feed.getSpesa().getId());
        service.saveSpesa(service.deleteSpesa2(news));

    }
    @PostMapping("/addSaldo/{idGruppo}")
    public void addSaldo(@RequestBody Saldo toto, @PathVariable Long idGruppo){
        Utente beneficiario = service.findUtenteById(toto.getBeneficiario());
        Utente pagatore = Utility.getUtente();
        Spesa saldo = new Spesa();
        saldo.setAccettata(false);
        saldo.setDeleted(false);
        saldo.setRequested(true);
        saldo.setImporto(toto.importo);
        Date dataPubblicazione = new Date(System.currentTimeMillis());
        saldo.setDataPubblicazione(dataPubblicazione);
        saldo.setGruppo(service.getGruppoById(idGruppo));
        saldo.setDescrizione(pagatore.getNome()+" vuole rimborsare " + beneficiario.getNome());
        service.saveSpesa(saldo);
        utente_spesa us1 = new utente_spesa();
        us1.setSpesa(saldo);
        us1.setImporto(toto.importo);
        us1.setUtente(beneficiario);
        us1.setProprietario(false);
        utente_spesa us2 = new utente_spesa();
        us2.setSpesa(saldo);
        us2.setImporto(-toto.importo);
        us2.setUtente(pagatore);
        us2.setProprietario(true);
        service.saveUtente_Spesa(us1);
        service.saveUtente_Spesa(us2);
        Feed feed = new Feed();
        feed.setNote("Saldo");
        feed.setDataPubblicazione(dataPubblicazione);
        feed.setSpesa(saldo);
        service.saveFeed(feed);

    }
}