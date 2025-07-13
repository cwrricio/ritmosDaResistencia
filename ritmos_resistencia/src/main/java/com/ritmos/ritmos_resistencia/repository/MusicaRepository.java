package com.ritmos.ritmos_resistencia.repository;

import com.ritmos.ritmos_resistencia.model.Musica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MusicaRepository extends JpaRepository<Musica, Long> {
    List<Musica> findByArtistaIdArtista(Long idArtista);

    List<Musica> findByGenero(String genero);
}