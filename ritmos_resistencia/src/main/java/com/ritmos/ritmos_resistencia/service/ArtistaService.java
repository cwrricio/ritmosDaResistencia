package com.ritmos.ritmos_resistencia.service;

import com.ritmos.ritmos_resistencia.model.Artista;
import com.ritmos.ritmos_resistencia.model.Musica;
import com.ritmos.ritmos_resistencia.model.Usuario;
import com.ritmos.ritmos_resistencia.repository.ArtistaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile; 
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID; 

@Service
public class ArtistaService {

    private final ArtistaRepository artistaRepository;
    private final UsuarioService usuarioService; 
    private final MusicaService musicaService;   

    private final String UPLOADS_BASE_DIR = "uploads/";
    private final String CAPAS_MUSICA_DIR = UPLOADS_BASE_DIR + "capas_musica/";
    private final String ARQUIVOS_MUSICA_DIR = UPLOADS_BASE_DIR + "arquivos_musica/"; 

    @Autowired
    public ArtistaService(ArtistaRepository artistaRepository, UsuarioService usuarioService, MusicaService musicaService) {
        this.artistaRepository = artistaRepository;
        this.usuarioService = usuarioService;
        this.musicaService = musicaService;

        Path capasPath = Paths.get(CAPAS_MUSICA_DIR);
        Path arquivosPath = Paths.get(ARQUIVOS_MUSICA_DIR); 
        try {
            if (!Files.exists(capasPath)) Files.createDirectories(capasPath);
            if (!Files.exists(arquivosPath)) Files.createDirectories(arquivosPath); 
        } catch (IOException e) {
            throw new RuntimeException("Não foi possível criar os diretórios de upload: " + e.getMessage(), e);
        }
    }

    public Artista criarArtistaCompleto(Usuario usuario, Artista artista, Musica musica, 
                                     MultipartFile capaMusicaFile, MultipartFile audioMusicaFile) throws IOException { // NOVO PARÂMETRO
        
        Usuario novoOuExistenteUsuario;
        if (usuario.getIdUsuario() == null) {
            if (usuarioService.buscarUsuarioPorEmail(usuario.getEmail()).isPresent()) {
                throw new IllegalArgumentException("Email de usuário já cadastrado.");
            }
            novoOuExistenteUsuario = usuarioService.salvarUsuario(usuario); 
        } else { 
            Optional<Usuario> usuarioOpt = usuarioService.buscarUsuarioPorId(usuario.getIdUsuario());
            if (usuarioOpt.isEmpty()) {
                throw new IllegalArgumentException("Usuário logado não encontrado.");
            }
            novoOuExistenteUsuario = usuarioOpt.get();
            if (artistaRepository.findByUsuarioIdUsuario(novoOuExistenteUsuario.getIdUsuario()).isPresent()) {
                throw new IllegalStateException("Este usuário já possui um perfil de artista.");
            }
        }

        artista.setUsuario(novoOuExistenteUsuario); 

        Artista novoArtista = artistaRepository.save(artista);

        String nomeArquivoCapa = UUID.randomUUID().toString() + "_" + capaMusicaFile.getOriginalFilename();
        Path destinoArquivoCapa = Paths.get(CAPAS_MUSICA_DIR).resolve(nomeArquivoCapa);
        Files.copy(capaMusicaFile.getInputStream(), destinoArquivoCapa, StandardCopyOption.REPLACE_EXISTING);
        String caminhoRelativoCapa = CAPAS_MUSICA_DIR + nomeArquivoCapa; 

        String nomeArquivoAudio = UUID.randomUUID().toString() + "_" + audioMusicaFile.getOriginalFilename();
        Path destinoArquivoAudio = Paths.get(ARQUIVOS_MUSICA_DIR).resolve(nomeArquivoAudio);
        Files.copy(audioMusicaFile.getInputStream(), destinoArquivoAudio, StandardCopyOption.REPLACE_EXISTING);
        String caminhoRelativoAudio = ARQUIVOS_MUSICA_DIR + nomeArquivoAudio; 

        musica.setArtista(novoArtista); 
        musica.setArquivo(caminhoRelativoAudio); 
        
        musicaService.salvarMusica(musica); 

        return novoArtista;
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
            throw new RuntimeException("Artista com ID " + id + " não encontrado para exclusão.");
        }
        artistaRepository.deleteById(id);
    }
}