package com.uncle.mydues.domain;
import org.hibernate.validator.constraints.UniqueElements;

import javax.persistence.*;


@Entity
@Table(name="utente_gruppo", uniqueConstraints = @UniqueConstraint(columnNames = {"id_utente", "id_gruppo"}))
@IdClass(utente_gruppoKEY.class)
public class utente_gruppo {


     @Id
     @ManyToOne
     @JoinColumn(name="ID_UTENTE", referencedColumnName = "ID_UTENTE")
     private Utente utente;

    @Id
    @ManyToOne
    @JoinColumn(name="ID_GRUPPO", referencedColumnName = "ID_GRUPPO")
    private Gruppo gruppo;

    @Column(name= "SALDO")
       private float saldo;


    public utente_gruppo() {
    }

    public utente_gruppo(Utente u, Gruppo g, float saldo) {

        this.saldo = saldo;
        this.gruppo = g;
        this.utente = u;
    }


    public Utente getUtente() {
        return utente;
    }

    public void setUtente(Utente utente) {
        this.utente = utente;
    }

    public Gruppo getGruppo() {
        return gruppo;
    }

    public void setGruppo(Gruppo gruppo) {
        this.gruppo = gruppo;
    }

    public float getSaldo() {
        return saldo;
    }

    public void setSaldo(float saldo) {
        this.saldo = saldo;
    }

    @Override
    public String toString() {
        return "utente_gruppo{" +
                "utente=" + utente +
                ", gruppo=" + gruppo +
                ", saldo=" + saldo +
                '}';
    }
}
