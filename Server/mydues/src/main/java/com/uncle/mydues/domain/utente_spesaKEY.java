package com.uncle.mydues.domain;

import java.io.Serializable;

public class utente_spesaKEY implements Serializable {

    private long utente;

    private long spesa;





    public long getUtente() {
        return utente;
    }

    public void setUtente(long utente) {
        this.utente = utente;
    }

    public long getSpesa() {
        return spesa;
    }

    public void setSpesa(long spesa) {
        this.spesa = spesa;
    }
}
