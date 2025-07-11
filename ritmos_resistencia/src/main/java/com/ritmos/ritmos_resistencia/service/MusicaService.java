package com.ritmos.ritmos_resistencia.service;

import com.ritmos.ritmos_resistencia.model.Musica;
import com.ritmos.ritmos_resistencia.model.Artista;
import com.ritmos.ritmos_resistencia.repository.MusicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MusicaService {

    private final MusicaRepository musicaRepository;
    private final ArtistaService artistaService; // Para verificar o artista associado

    @Autowired
    public MusicaService(MusicaRepository musicaRepository, ArtistaService artistaService) {
        this.musicaRepository = musicaRepository;
        this.artistaService = artistaService;
    }

    public Musica salvarMusica(Musica musica) {

        if (musica.getArtista() == null || musica.getArtista().getIdArtista() == null) {
            throw new IllegalArgumentException("Música deve estar associada a um artista existente.");
        }
        Optional<Artista> artistaOpt = artistaService.buscarArtistaPorId(musica.getArtista().getIdArtista());
        if (artistaOpt.isEmpty()) {
            throw new IllegalArgumentException("Artista associado à música não encontrado.");
        }
        musica.setArtista(artistaOpt.get());
        
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