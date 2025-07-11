package com.ritmos.ritmos_resistencia.service;

import com.ritmos.ritmos_resistencia.model.Doacao;
import com.ritmos.ritmos_resistencia.model.Usuario;
import com.ritmos.ritmos_resistencia.model.Artista;
import com.ritmos.ritmos_resistencia.repository.DoacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

@Service
public class DoacaoService {

    private final DoacaoRepository doacaoRepository;
    private final UsuarioService usuarioService; 
    private final ArtistaService artistaService;

    @Autowired
    public DoacaoService(DoacaoRepository doacaoRepository, UsuarioService usuarioService, ArtistaService artistaService) {
        this.doacaoRepository = doacaoRepository;
        this.usuarioService = usuarioService;
        this.artistaService = artistaService;
    }

    public Doacao realizarDoacao(Doacao doacao) {
        if (doacao.getDoador() == null || doacao.getDoador().getIdUsuario() == null) {
            throw new IllegalArgumentException("Doação deve ter um doador associado.");
        }
        Optional<Usuario> doadorOpt = usuarioService.buscarUsuarioPorId(doacao.getDoador().getIdUsuario());
        if (doadorOpt.isEmpty()) {
            throw new IllegalArgumentException("Usuário doador não encontrado.");
        }
        doacao.setDoador(doadorOpt.get()); 
        if (doacao.getArtistaRecebedor() == null || doacao.getArtistaRecebedor().getIdArtista() == null) {
            throw new IllegalArgumentException("Doação deve ser para um artista recebedor.");
        }
        Optional<Artista> recebedorOpt = artistaService.buscarArtistaPorId(doacao.getArtistaRecebedor().getIdArtista());
        if (recebedorOpt.isEmpty()) {
            throw new IllegalArgumentException("Artista recebedor não encontrado.");
        }
        doacao.setArtistaRecebedor(recebedorOpt.get()); 
        if (doacao.getDataDoacao() == null) {
            doacao.setDataDoacao(LocalDateTime.now());
        }

        return doacaoRepository.save(doacao);
    }

    public List<Doacao> listarTodasDoacoes() {
        return doacaoRepository.findAll();
    }

    public Optional<Doacao> buscarDoacaoPorId(Long id) {
        return doacaoRepository.findById(id);
    }

    public List<Doacao> buscarDoacoesPorDoador(Long idUsuario) {
        return doacaoRepository.findByDoadorIdUsuario(idUsuario);
    }

    public List<Doacao> buscarDoacoesParaArtista(Long idArtista) {
        return doacaoRepository.findByArtistaRecebedorIdArtista(idArtista);
    }

    public void deletarDoacao(Long id) {
        if (!doacaoRepository.existsById(id)) {
            throw new RuntimeException("Doação com ID " + id + " não encontrada para exclusão.");
        }
        doacaoRepository.deleteById(id);
    }
}