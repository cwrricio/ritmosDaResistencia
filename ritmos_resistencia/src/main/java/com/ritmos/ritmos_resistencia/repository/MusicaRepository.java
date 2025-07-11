package com.ritmos.ritmos_resistencia.repository;

import com.ritmos.ritmos_resistencia.model.Musica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MusicaRepository extends JpaRepository<Musica, Long> {
    // Buscar músicas por um artista específico
    List<Musica> findByArtistaIdArtista(Long idArtista);

    // Buscar músicas por gênero
    List<Musica> findByGenero(String genero);
}