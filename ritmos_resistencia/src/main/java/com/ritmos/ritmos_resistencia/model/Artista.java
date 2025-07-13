package com.ritmos.ritmos_resistencia.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "artista")
@Data 
@NoArgsConstructor
@AllArgsConstructor
public class Artista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_artista")
    private Long idArtista;

    @Column(name = "nome_artistico", nullable = false)
    private String nomeArtistico;

    @Column(name = "biografia", columnDefinition = "TEXT")
    private String biografia;

    @Column(name = "instagram")
    private String instagram;

    @Column(name = "spotify")
    private String spotify;

    @OneToOne(fetch = FetchType.LAZY) 
    @JoinColumn(name = "fk_usuario_id_usuario", referencedColumnName = "id_usuario", nullable = false, unique = true)
    private Usuario usuario; 

    @OneToMany(mappedBy = "artista", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Musica> musicas;

    @OneToMany(mappedBy = "artistaRecebedor")
    private List<Doacao> doacoesRecebidas;
}