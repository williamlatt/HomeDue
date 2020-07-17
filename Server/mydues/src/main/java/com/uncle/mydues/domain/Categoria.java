package com.uncle.mydues.domain;

import javax.persistence.*;

@Entity
@Table(name="categoria")
@DiscriminatorValue("categoria")

public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column( name= "ID_CATEGORIA", nullable = false)
    private long id;

    @Column( name="NOME", nullable = false)
    private String nome;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
