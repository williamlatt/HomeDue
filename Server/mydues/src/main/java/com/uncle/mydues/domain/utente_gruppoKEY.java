package com.uncle.mydues.domain;

import java.io.Serializable;
import java.util.Objects;

public class utente_gruppoKEY implements Serializable {

    private long utente;

    private long gruppo;

    public long getGruppo() {return gruppo;}

    public void setGruppo(int gruppo) {this.gruppo = gruppo;}

    public void setUtente(int utente) {
        this.utente = utente;
    }

}