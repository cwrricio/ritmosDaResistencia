package com.ritmos.ritmos_resistencia.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal; 
import java.time.LocalDateTime; 

@Entity
@Table(name = "doacao")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Doacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_doacao")
    private Long idDoacao;

    @Column(name = "valor", nullable = false, precision = 10, scale = 2) 
    private BigDecimal valor; 

    @Column(name = "metodo_pagamento", nullable = false)
    private String metodoPagamento;

    @Column(name = "status", nullable = false)
    private String status; 

    @Column(name = "mensagem", columnDefinition = "TEXT") 
    private String mensagem;

    @Column(name = "data_doacao", nullable = false)
    private LocalDateTime dataDoacao; 

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_doador_usuario_id_usuario", referencedColumnName = "id_usuario", nullable = false)
    private Usuario doador;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_recebedor_artista_id_artista", referencedColumnName = "id_artista", nullable = false)
    private Artista artistaRecebedor;
}