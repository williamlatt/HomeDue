package com.uncle.mydues.domain;

import org.hibernate.annotations.Cascade;
import org.springframework.boot.actuate.autoconfigure.endpoint.condition.ConditionalOnAvailableEndpoint;

import javax.persistence.*;
import java.io.File;
import java.util.Date;

@Entity
@Table(name="spesa")
@DiscriminatorValue("gruppo")
public class Spesa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID_SPESA", nullable = false)
    private long id;

    @Column(name="DESCRIZIONE", nullable= false)
    private String descrizione;

    @Column(name="IMPORTO", nullable = false)
    private int importo;

    @Column(name="LINK", nullable = true)
    private String link;
    private String immagine;
    @Column(name = "DATA_PUBBLICAZIONE")
    private Date dataPubblicazione;

    @Column(name = "RICHIESTA")
    private boolean richiesta;

    @Column(name = "ACCETTATA")
    private boolean accettata;

    @Column(name ="DELETED")
    private boolean deleted;

    @ManyToOne
    @JoinColumn(name="ID_GRUPPO", nullable = false)
    private Gruppo gruppo;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public int getImporto() {
        return importo;
    }

    public void setImporto(int importo) {
        this.importo = importo;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Date getDataPubblicazione() {
        return dataPubblicazione;
    }

    public void setDataPubblicazione(Date dataPubblicazione) {
        this.dataPubblicazione = dataPubblicazione;
    }

    public Gruppo getGruppo() {
        return gruppo;
    }

    public void setGruppo(Gruppo gruppo) {
        this.gruppo = gruppo;
    }

    public boolean isRequested() { return richiesta; }

    public void setRequested(boolean requested) { this.richiesta = requested; }

    public boolean isAccettata() { return accettata; }

    public void setAccettata(boolean accettata) { this.accettata = accettata; }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public String getImmagine() {
        return immagine;
    }

    public void setImmagine(String immagine) {
        this.immagine = immagine;
    }

    public boolean isRichiesta() {
        return richiesta;
    }

    public void setRichiesta(boolean richiesta) {
        this.richiesta = richiesta;
    }
}
