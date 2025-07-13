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

    @Column(name = "arquivo", nullable = false) 
    private String arquivo;

    @Column(name = "capa", nullable = false) 
    private String capa; 

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_artista_id_artista", referencedColumnName = "id_artista", nullable = false)
    private Artista artista;
}