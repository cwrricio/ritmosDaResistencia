package com.ritmos.ritmos_resistencia.service;

import com.ritmos.ritmos_resistencia.model.Artista;
import com.ritmos.ritmos_resistencia.model.Usuario;
import com.ritmos.ritmos_resistencia.repository.ArtistaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ArtistaService {

    private final ArtistaRepository artistaRepository;
    private final UsuarioService usuarioService; 

    @Autowired
    public ArtistaService(ArtistaRepository artistaRepository, UsuarioService usuarioService) {
        this.artistaRepository = artistaRepository;
        this.usuarioService = usuarioService;
    }

    public Artista salvarArtista(Artista artista) {
        if (artista.getUsuario() == null || artista.getUsuario().getIdUsuario() == null) {
            throw new IllegalArgumentException("Artista deve estar associado a um usuário existente.");
        }
        Optional<Usuario> usuarioOpt = usuarioService.buscarUsuarioPorId(artista.getUsuario().getIdUsuario());
        if (usuarioOpt.isEmpty()) {
            throw new IllegalArgumentException("Usuário associado ao artista não encontrado.");
        }

        if (artista.getIdArtista() == null && artistaRepository.findByUsuarioIdUsuario(usuarioOpt.get().getIdUsuario()).isPresent()) {
            throw new IllegalStateException("Este usuário já possui um perfil de artista.");
        }
        artista.setUsuario(usuarioOpt.get()); 

        return artistaRepository.save(artista);
    }

    public List<Artista> listarTodosArtistas() {
        return artistaRepository.findAll();
    }

    public Optional<Artista> buscarArtistaPorId(Long id) {
        return artistaRepository.findById(id);
    }

    public void deletarArtista(Long id) {
        if (!artistaRepository.existsById(id)) {
            throw new RuntimeException("Artista " + id + " não encontrado para exclusão.");
        }
        artistaRepository.deleteById(id);
    }
}