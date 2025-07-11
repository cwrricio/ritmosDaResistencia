package com.ritmos.ritmos_resistencia.controller;

import com.ritmos.ritmos_resistencia.model.Artista;
import com.ritmos.ritmos_resistencia.service.ArtistaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/artistas")
public class ArtistaController {

    private final ArtistaService artistaService;

    @Autowired
    public ArtistaController(ArtistaService artistaService) {
        this.artistaService = artistaService;
    }

    @PostMapping
    public ResponseEntity<Artista> criarArtista(@RequestBody Artista artista) {
        try {
            Artista novoArtista = artistaService.salvarArtista(artista);
            return new ResponseEntity<>(novoArtista, HttpStatus.CREATED);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST); 
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<Artista>> listarArtistas() {
        List<Artista> artistas = artistaService.listarTodosArtistas();
        return new ResponseEntity<>(artistas, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Artista> buscarArtistaPorId(@PathVariable Long id) {
        Optional<Artista> artista = artistaService.buscarArtistaPorId(id);
        return artista.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                      .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Artista> atualizarArtista(@PathVariable Long id, @RequestBody Artista artistaDetails) {
        Optional<Artista> artistaExistente = artistaService.buscarArtistaPorId(id);

        if (artistaExistente.isPresent()) {
            Artista artista = artistaExistente.get();
            artista.setNomeArtistico(artistaDetails.getNomeArtistico());
            artista.setBiografia(artistaDetails.getBiografia());
            artista.setInstagram(artistaDetails.getInstagram());
            artista.setSpotify(artistaDetails.getSpotify());
            
            try {
                Artista artistaAtualizado = artistaService.salvarArtista(artista);
                return new ResponseEntity<>(artistaAtualizado, HttpStatus.OK);
            } catch (IllegalArgumentException | IllegalStateException e) {
                 return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            } catch (Exception e) {
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deletarArtista(@PathVariable Long id) {
        try {
            artistaService.deletarArtista(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
        }
    }
}