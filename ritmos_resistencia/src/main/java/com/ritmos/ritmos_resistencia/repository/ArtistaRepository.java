package com.ritmos.ritmos_resistencia.repository;

import com.ritmos.ritmos_resistencia.model.Artista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ArtistaRepository extends JpaRepository<Artista, Long> {
    Optional<Artista> findByUsuarioIdUsuario(Long idUsuario);

    Optional<Artista> findByNomeArtistico(String nomeArtistico);
}