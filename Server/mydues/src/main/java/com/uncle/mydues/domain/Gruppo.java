package com.uncle.mydues.domain;
import javax.persistence.*;
import javax.websocket.OnError;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "gruppo")
@DiscriminatorValue("gruppo")
public class Gruppo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_GRUPPO", nullable = false)
    private Long id;

    @Column(name = "NOME", nullable = false, length = 255)
    private String nome;

    @Column(name = "LINK", nullable = true)
    private String link;

    @Column(name= "CODICE", nullable = false)
    private String codice;

    /*@OneToMany(mappedBy = "gruppo")
    private List<utente_gruppo> utenteAssoc;*/


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getLink() {return link;}

    public void setLink(String link) {this.link = link;}

    public String getCodice() {return codice;}

    @Override
    public String toString() {
        return "Gruppo{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", link='" + link + '\'' +
                ", codice='" + codice + '\'' +
                '}';
    }

    public void setCodice(String codice) {
        this.codice = codice;
    }
    /* public List<utente_gruppo> getUtenteAssoc() {return utenteAssoc;}

    public void setUtenteAssoc(List<utente_gruppo> utenteAssoc) {this.utenteAssoc = utenteAssoc;}*/
}
