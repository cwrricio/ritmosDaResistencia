package com.ritmos.ritmos_resistencia.controller;

import com.ritmos.ritmos_resistencia.model.Musica;
import com.ritmos.ritmos_resistencia.service.MusicaService;
import com.ritmos.ritmos_resistencia.dto.response.MusicaResponseDTO; 
import com.ritmos.ritmos_resistencia.dto.response.ArtistaResponseDTO; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors; 

@RestController
@RequestMapping("/api") 
public class MusicaController {

    private final MusicaService musicaService;

    @Autowired
    public MusicaController(MusicaService musicaService) {
        this.musicaService = musicaService;
    }

    @PostMapping("/musicas") 
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

    @GetMapping("/musicas") 
    public ResponseEntity<List<MusicaResponseDTO>> listarMusicas() {
        List<Musica> musicas = musicaService.listarTodasMusicas();
        
        List<MusicaResponseDTO> musicasDTO = musicas.stream().map(musica -> {
            ArtistaResponseDTO artistaDTO = null;
            if (musica.getArtista() != null) {
                artistaDTO = new ArtistaResponseDTO(
                    musica.getArtista().getIdArtista(),
                    musica.getArtista().getNomeArtistico(),
                    musica.getArtista().getBiografia(),
                    musica.getArtista().getInstagram(),
                    musica.getArtista().getSpotify(),
                    musica.getArtista().getMusicas() != null && !musica.getArtista().getMusicas().isEmpty() ? musica.getArtista().getMusicas().get(0).getCapa() : null
                );
            }
            return new MusicaResponseDTO(
                musica.getIdMusica(),
                musica.getNomeMusica(),
                musica.getGenero(),
                musica.getArquivo(),
                musica.getCapa(), 
                artistaDTO
            );
        }).collect(Collectors.toList());

        if (musicasDTO.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(musicasDTO, HttpStatus.OK);
    }

    @GetMapping("/musicas/{id}") 
    public ResponseEntity<MusicaResponseDTO> buscarMusicaPorId(@PathVariable Long id) {
        Optional<Musica> musicaOpt = musicaService.buscarMusicaPorId(id);
        
        if (musicaOpt.isPresent()) {
            Musica musica = musicaOpt.get();
            ArtistaResponseDTO artistaDTO = null;
            if (musica.getArtista() != null) { 
                artistaDTO = new ArtistaResponseDTO(
                    musica.getArtista().getIdArtista(),
                    musica.getArtista().getNomeArtistico(),
                    musica.getArtista().getBiografia(),
                    musica.getArtista().getInstagram(),
                    musica.getArtista().getSpotify(),
                    musica.getArtista().getMusicas() != null && !musica.getArtista().getMusicas().isEmpty() ? musica.getArtista().getMusicas().get(0).getCapa() : null
                );
            }
            MusicaResponseDTO musicaDTO = new MusicaResponseDTO(
                musica.getIdMusica(),
                musica.getNomeMusica(),
                musica.getGenero(),
                musica.getArquivo(),
                musica.getCapa(),
                artistaDTO
            );
            return new ResponseEntity<>(musicaDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/musicas/artista/{idArtista}") 
    public ResponseEntity<List<MusicaResponseDTO>> listarMusicasPorArtista(@PathVariable Long idArtista) {
        List<Musica> musicas = musicaService.buscarMusicasPorArtista(idArtista);

        List<MusicaResponseDTO> musicasDTO = musicas.stream().map(musica -> {
            ArtistaResponseDTO artistaDTO = null;
            if (musica.getArtista() != null) {
                artistaDTO = new ArtistaResponseDTO(
                    musica.getArtista().getIdArtista(),
                    musica.getArtista().getNomeArtistico(),
                    musica.getArtista().getBiografia(),
                    musica.getArtista().getInstagram(),
                    musica.getArtista().getSpotify(),
                    musica.getArtista().getMusicas() != null && !musica.getArtista().getMusicas().isEmpty() ? musica.getArtista().getMusicas().get(0).getCapa() : null
                );
            }
            return new MusicaResponseDTO(
                musica.getIdMusica(),
                musica.getNomeMusica(),
                musica.getGenero(),
                musica.getArquivo(),
                musica.getCapa(),
                artistaDTO
            );
        }).collect(Collectors.toList());

        if (musicasDTO.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(musicasDTO, HttpStatus.OK);
    }

    @PutMapping("/musicas/{id}") 
    public ResponseEntity<MusicaResponseDTO> atualizarMusica(@PathVariable Long id, @RequestBody Musica musicaDetails) {
        Optional<Musica> musicaExistente = musicaService.buscarMusicaPorId(id);

        if (musicaExistente.isPresent()) {
            Musica musica = musicaExistente.get();
            musica.setNomeMusica(musicaDetails.getNomeMusica());
            musica.setGenero(musicaDetails.getGenero());
            musica.setArquivo(musicaDetails.getArquivo());
            musica.setCapa(musicaDetails.getCapa());
            
            try {
                Musica musicaAtualizada = musicaService.salvarMusica(musica);
                
                ArtistaResponseDTO artistaDTO = null;
                if (musicaAtualizada.getArtista() != null) {
                    artistaDTO = new ArtistaResponseDTO(
                        musicaAtualizada.getArtista().getIdArtista(),
                        musicaAtualizada.getArtista().getNomeArtistico(),
                        musicaAtualizada.getArtista().getBiografia(),
                        musicaAtualizada.getArtista().getInstagram(),
                        musicaAtualizada.getArtista().getSpotify(),
                        musicaAtualizada.getArtista().getMusicas() != null && !musicaAtualizada.getArtista().getMusicas().isEmpty() ? musicaAtualizada.getArtista().getMusicas().get(0).getCapa() : null
                    );
                }
                MusicaResponseDTO musicaAtualizadaDTO = new MusicaResponseDTO(
                    musicaAtualizada.getIdMusica(),
                    musicaAtualizada.getNomeMusica(),
                    musicaAtualizada.getGenero(),
                    musicaAtualizada.getArquivo(),
                    musicaAtualizada.getCapa(),
                    artistaDTO
                );
                return new ResponseEntity<>(musicaAtualizadaDTO, HttpStatus.OK);
            } catch (IllegalArgumentException e) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            } catch (Exception e) {
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/musicas/{id}") 
    public ResponseEntity<HttpStatus> deletarMusica(@PathVariable Long id) {
        try {
            musicaService.deletarMusica(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}