package com.uncle.mydues.api;


import com.uncle.mydues.domain.Utente;
import jdk.internal.dynalink.support.NameCodec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

public class UtenteResponse {
    private Long id;
    private String username;
    private String nome;
    private String cognome;
    private String email;
    private String link;




    public UtenteResponse() {
    }

    public UtenteResponse(Utente utente) {

        this.id = utente.getId();
        this.nome = utente.getNome();
        this.cognome = utente.getCognome();
        this.username = utente.getUsername();
        this.email = utente.getEmail();
        this.link = utente.getLink();
    }

    public String getLink() {return link;}
    public void setLink(String link) {this.link = link;}
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
   //public String getPassword() {return password;}
   //public void setPassword(String password) {this.password = password;}
    public String getCognome() {
        return cognome;
    }
    public void setCognome(String cognome) {
        this.cognome = cognome;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }


}
