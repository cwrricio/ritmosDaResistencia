package com.ritmos.ritmos_resistencia.repository;

import com.ritmos.ritmos_resistencia.model.Doacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.math.BigDecimal; 
import java.time.LocalDateTime; 

@Repository
public interface DoacaoRepository extends JpaRepository<Doacao, Long> {
    List<Doacao> findByDoadorIdUsuario(Long idUsuario);

    List<Doacao> findByArtistaRecebedorIdArtista(Long idArtista);

    List<Doacao> findByDataDoacaoBetween(LocalDateTime startDate, LocalDateTime endDate);

    List<Doacao> findByValorGreaterThanEqual(BigDecimal valor);
}