package com.example.senhas.model;

public class Senha {

    private String senha;
    private String tipo;

    public Senha() {
    }

    public Senha(String senha, String tipo) {
        this.senha = senha;
        this.tipo = tipo;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}