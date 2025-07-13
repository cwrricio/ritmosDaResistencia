package com.ritmos.ritmos_resistencia.controller;

import com.ritmos.ritmos_resistencia.model.Artista;
import com.ritmos.ritmos_resistencia.model.Musica; 
import com.ritmos.ritmos_resistencia.model.Usuario; 
import com.ritmos.ritmos_resistencia.service.ArtistaService;
import com.ritmos.ritmos_resistencia.dto.ArtistaMusicaRequest; 
import com.ritmos.ritmos_resistencia.dto.response.ArtistaResponseDTO; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile; 
import com.fasterxml.jackson.databind.ObjectMapper; 
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors; 

@RestController
@RequestMapping("/api") 
public class ArtistaController {

    private final ArtistaService artistaService;
    private final ObjectMapper objectMapper; 

    @Autowired
    public ArtistaController(ArtistaService artistaService, ObjectMapper objectMapper) {
        this.artistaService = artistaService;
        this.objectMapper = objectMapper; 
    }

    @PostMapping("/artistas/cadastro-completo")
    public ResponseEntity<?> criarArtistaCompleto(
        @RequestPart("data") String artistaMusicaRequestJson, 
        @RequestPart("capaMusica") MultipartFile capaMusicaFile,
        @RequestPart("audioMusica") MultipartFile audioMusicaFile 
    ) {
        try {
            ArtistaMusicaRequest request = objectMapper.readValue(artistaMusicaRequestJson, ArtistaMusicaRequest.class);

            Artista artista = request.getArtista();
            Usuario usuario = request.getUsuario();
            Musica musica = request.getMusica();

            Artista novoArtista = artistaService.criarArtistaCompleto(usuario, artista, musica, capaMusicaFile, audioMusicaFile);

            ArtistaResponseDTO responseDTO = new ArtistaResponseDTO(
                novoArtista.getIdArtista(),
                novoArtista.getNomeArtistico(),
                novoArtista.getBiografia(),
                novoArtista.getInstagram(),
                novoArtista.getSpotify()
            );

            return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (IOException e) {
            return new ResponseEntity<>("Erro ao processar o arquivo: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro interno ao cadastrar: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/artistas") 
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

    @GetMapping("/artistas") 
    public ResponseEntity<List<ArtistaResponseDTO>> listarArtistas() {
        List<Artista> artistas = artistaService.listarTodosArtistas();
        
        List<ArtistaResponseDTO> artistasDTO = artistas.stream().map(artista ->
            new ArtistaResponseDTO(
                artista.getIdArtista(),
                artista.getNomeArtistico(),
                artista.getBiografia(),
                artista.getInstagram(),
                artista.getSpotify()
            )
        ).collect(Collectors.toList());

        if (artistasDTO.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); 
        }
        return new ResponseEntity<>(artistasDTO, HttpStatus.OK);
    }

    @GetMapping("/artistas/{id}") 
    public ResponseEntity<Artista> buscarArtistaPorId(@PathVariable Long id) {
        Optional<Artista> artista = artistaService.buscarArtistaPorId(id);
        return artista.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                      .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/artistas/{id}") 
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

    @DeleteMapping("/artistas/{id}") 
    public ResponseEntity<HttpStatus> deletarArtista(@PathVariable Long id) {
        try {
            artistaService.deletarArtista(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}