package com.uncle.mydues.domain;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="feed")
@DiscriminatorValue("feed")
public class Feed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column( name= "ID_FEED", nullable = false)
    private long id;


    @Column( name="NOTE", nullable = false)
    private String note;

    @Column(name = "DATA_PUBBLICAZIONE")
    private Date dataPubblicazione;

    @ManyToOne
    @JoinColumn(name="ID_SPESA", nullable = false)
    private Spesa spesa;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Date getDataPubblicazione() {
        return dataPubblicazione;
    }

    public void setDataPubblicazione(Date dataPubblicazione) {
        this.dataPubblicazione = dataPubblicazione;
    }

    public Spesa getSpesa() {
        return spesa;
    }

    public void setSpesa(Spesa spesa) {
        this.spesa = spesa;
    }

    @Override
    public String toString() {
        return "Feed{" +
                "id=" + id +
                ", note='" + note + '\'' +
                ", dataPubblicazione=" + dataPubblicazione +
                ", spesa=" + spesa +
                '}';
    }
}
