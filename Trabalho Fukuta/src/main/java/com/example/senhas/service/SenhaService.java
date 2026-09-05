package com.example.senhas.service;

import com.example.senhas.model.Senha;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class SenhaService {

    private final List<Senha> senhas = new ArrayList<>();
    private final Random random = new Random();

    public Senha gerarSenha(String tipo) {

        String prefixo;

        if (tipo.equalsIgnoreCase("prioridade")) {
            prefixo = "P";
        } else if (tipo.equalsIgnoreCase("idoso")) {
            prefixo = "I";
        } else {
            prefixo = "N";
        }

        String numero;

        do {
            numero = String.format("%03d", random.nextInt(10000));
        } while (senhaExiste(prefixo + "-" + numero));

        Senha novaSenha = new Senha(
                prefixo + "-" + numero,
                tipo
        );

        senhas.add(novaSenha);

        return novaSenha;
    }

    private boolean senhaExiste(String senha) {

        for (Senha s : senhas) {
            if (s.getSenha().equals(senha)) {
                return true;
            }
        }

        return false;
    }

    public List<Senha> listarSenhas() {
        return senhas;
    }

    public void limparSenhas() {
        senhas.clear();
    }
}