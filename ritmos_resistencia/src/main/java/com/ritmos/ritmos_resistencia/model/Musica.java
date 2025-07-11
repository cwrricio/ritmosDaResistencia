package com.ritmos.ritmos_resistencia.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "musica")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Musica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_musica")
    private Long idMusica;

    @Column(name = "nome_musica", nullable = false)
    private String nomeMusica;

    @Column(name = "genero", nullable = false)
    private String genero;

    @Column(name = "arquivo", nullable = false) // Caminho ou URL para o arquivo de áudio
    private String arquivo;

    // Relacionamento Many-to-One: Muitas Musicas para Um Artista
    // fk_artista_id_artista aponta para id_artista da tabela artista
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_artista_id_artista", referencedColumnName = "id_artista", nullable = false)
    private Artista artista; // Objeto Artista associado a esta música
}