package com.uncle.mydues.domain;

public class Saldo {
    public Long pagatore;
    public Long beneficiario;
    public Integer importo;



    public Saldo(){

    }
    public Long getPagatore() {
        return pagatore;
    }

    public Long getBeneficiario() {
        return beneficiario;
    }

    public Integer getImporto() {
        return importo;
    }

    @Override
    public String toString() {
        return "Saldo{" +
                "idRichiedente=" + pagatore +
                ", idBeneficiario=" + beneficiario +
                ", importo=" + importo +
                '}';
    }
}

