package com.example.senhas.controller;

import com.example.senhas.model.Senha;
import com.example.senhas.service.SenhaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/senhas")
public class SenhaController {

    private final SenhaService service;

    public SenhaController(SenhaService service) {
        this.service = service;
    }

    @PostMapping
    public Senha gerarSenha(@RequestParam String tipo) {
        return service.gerarSenha(tipo);
    }

    @GetMapping
    public List<Senha> listarSenhas() {
        return service.listarSenhas();
    }

    @DeleteMapping
    public void limparSenhas() {
        service.limparSenhas();
    }
}