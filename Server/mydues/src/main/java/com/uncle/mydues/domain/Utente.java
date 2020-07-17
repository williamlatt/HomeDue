package com.uncle.mydues.domain;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity

@Table(name = "utente")
@DiscriminatorValue("utente")

public class Utente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_UTENTE", nullable = false)
    private Long id;


    @Column(name = "USERNAME", nullable = false, length = 255)
    private String username;

    @Column(name = "NOME", nullable = false, length = 255)
    private String nome;

    @Column(name = "COGNOME", nullable = false, length = 255)
    private String cognome;


    @Column(name = "PASSWORD", nullable = false, length = 255)
    private String password;

    @Column(name = "EMAIL", nullable = false, length = 255, unique = true)
    private String email;

    @Column(name = "LINK", nullable = true)
    private String link;


    public String getLink() {return link;}

    public void setLink(String link) {this.link = link;}

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) { this.password = password; }

    public String getUsername() { return username; }

    public void setUsername(String username) { this.username = username; }

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

    /*public List<utente_gruppo> getGruppoAssoc() {return gruppoAssoc;}

    public void setGruppoAssoc(List<utente_gruppo> gruppoAssoc) {this.gruppoAssoc = gruppoAssoc;}*/

}