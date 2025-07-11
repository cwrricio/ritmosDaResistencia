package com.ritmos.ritmos_resistencia.controller;

import com.ritmos.ritmos_resistencia.model.Doacao;
import com.ritmos.ritmos_resistencia.service.DoacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/doacoes")
public class DoacaoController {

    private final DoacaoService doacaoService;

    @Autowired
    public DoacaoController(DoacaoService doacaoService) {
        this.doacaoService = doacaoService;
    }

   
    @PostMapping
    public ResponseEntity<Doacao> realizarDoacao(@RequestBody Doacao doacao) {
        try {
            Doacao novaDoacao = doacaoService.realizarDoacao(doacao);
            return new ResponseEntity<>(novaDoacao, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<Doacao>> listarDoacoes() {
        List<Doacao> doacoes = doacaoService.listarTodasDoacoes();
        return new ResponseEntity<>(doacoes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doacao> buscarDoacaoPorId(@PathVariable Long id) {
        Optional<Doacao> doacao = doacaoService.buscarDoacaoPorId(id);
        return doacao.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<Doacao>> listarDoacoesPorUsuario(@PathVariable Long idUsuario) {
        List<Doacao> doacoes = doacaoService.buscarDoacoesPorDoador(idUsuario);
        if (doacoes.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(doacoes, HttpStatus.OK);
    }

    @GetMapping("/artista/{idArtista}")
    public ResponseEntity<List<Doacao>> listarDoacoesParaArtista(@PathVariable Long idArtista) {
        List<Doacao> doacoes = doacaoService.buscarDoacoesParaArtista(idArtista);
        if (doacoes.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(doacoes, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deletarDoacao(@PathVariable Long id) {
        try {
            doacaoService.deletarDoacao(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}