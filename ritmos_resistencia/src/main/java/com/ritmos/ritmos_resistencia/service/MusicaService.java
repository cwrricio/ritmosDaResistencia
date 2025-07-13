package com.ritmos.ritmos_resistencia.service;

import com.ritmos.ritmos_resistencia.model.Musica;
import com.ritmos.ritmos_resistencia.repository.MusicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MusicaService {

    private final MusicaRepository musicaRepository;
    
    @Autowired
    public MusicaService(MusicaRepository musicaRepository) { 
        this.musicaRepository = musicaRepository;
    }

    public Musica salvarMusica(Musica musica) {

        return musicaRepository.save(musica);
    }

    public List<Musica> listarTodasMusicas() {
        return musicaRepository.findAll();
    }

    public Optional<Musica> buscarMusicaPorId(Long id) {
        return musicaRepository.findById(id);
    }

    public List<Musica> buscarMusicasPorArtista(Long idArtista) {
        return musicaRepository.findByArtistaIdArtista(idArtista);
    }

    public void deletarMusica(Long id) {
        if (!musicaRepository.existsById(id)) {
            throw new RuntimeException("Música com ID " + id + " não encontrada para exclusão.");
        }
        musicaRepository.deleteById(id);
    }
}