package com.uncle.mydues.domain;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;


@Entity
@Table(name="utente_spesa")
@IdClass(utente_spesaKEY.class)
public class utente_spesa {

    @Id
    @ManyToOne
    @JoinColumn(name="ID_UTENTE", referencedColumnName = "ID_UTENTE")
    private Utente utente;

    @Id
    @ManyToOne
    @JoinColumn(name="ID_SPESA", referencedColumnName = "ID_SPESA")
    private Spesa spesa;

    @Column(name= "PROPRIETARIO")
    private boolean proprietario;

    @Column(name="IMPORTO")
    private float importo;



    public utente_spesa() {
    }

    public utente_spesa(Utente u, Spesa s, boolean proprietario) {

        this.proprietario = proprietario;
        this.spesa = s;
        this.utente = u;
    }

    public Utente getUtente() {
        return utente;
    }

    public void setUtente(Utente utente) {
        this.utente = utente;
    }

    public Spesa getSpesa() {
        return spesa;
    }

    public void setSpesa(Spesa spesa) {
        this.spesa = spesa;
    }

    public boolean isProprietario() {
        return proprietario;
    }

    public void setProprietario(boolean proprietario) {
        this.proprietario = proprietario;
    }

    @Override
    public String toString() {
        return "utente_spesa{" +
                "utente=" + utente +
                ", spesa=" + spesa +
                ", proprietario=" + proprietario +
                ", importo=" + importo +
                '}';
    }

    public float getImporto() {return importo;}

    public void setImporto(float importo) {this.importo = importo;}
}
