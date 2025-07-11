package com.ritmos.ritmos_resistencia.controller;

import com.ritmos.ritmos_resistencia.model.Musica;
import com.ritmos.ritmos_resistencia.service.MusicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/musicas")
public class MusicaController {

    private final MusicaService musicaService;

    @Autowired
    public MusicaController(MusicaService musicaService) {
        this.musicaService = musicaService;
    }

    @PostMapping
    public ResponseEntity<Musica> criarMusica(@RequestBody Musica musica) {
        try {
            Musica novaMusica = musicaService.salvarMusica(musica);
            return new ResponseEntity<>(novaMusica, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<Musica>> listarMusicas() {
        List<Musica> musicas = musicaService.listarTodasMusicas();
        return new ResponseEntity<>(musicas, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Musica> buscarMusicaPorId(@PathVariable Long id) {
        Optional<Musica> musica = musicaService.buscarMusicaPorId(id);
        return musica.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/artista/{idArtista}")
    public ResponseEntity<List<Musica>> listarMusicasPorArtista(@PathVariable Long idArtista) {
        List<Musica> musicas = musicaService.buscarMusicasPorArtista(idArtista);
        if (musicas.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); 
        }
        return new ResponseEntity<>(musicas, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Musica> atualizarMusica(@PathVariable Long id, @RequestBody Musica musicaDetails) {
        Optional<Musica> musicaExistente = musicaService.buscarMusicaPorId(id);

        if (musicaExistente.isPresent()) {
            Musica musica = musicaExistente.get();
            musica.setNomeMusica(musicaDetails.getNomeMusica());
            musica.setGenero(musicaDetails.getGenero());
            musica.setArquivo(musicaDetails.getArquivo());
            
            try {
                Musica musicaAtualizada = musicaService.salvarMusica(musica);
                return new ResponseEntity<>(musicaAtualizada, HttpStatus.OK);
            } catch (IllegalArgumentException e) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            } catch (Exception e) {
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deletarMusica(@PathVariable Long id) {
        try {
            musicaService.deletarMusica(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}