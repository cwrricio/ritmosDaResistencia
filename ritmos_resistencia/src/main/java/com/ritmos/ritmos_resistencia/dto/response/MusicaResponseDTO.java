package com.ritmos.ritmos_resistencia.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MusicaResponseDTO {
    private Long idMusica;
    private String nomeMusica;
    private String genero;
    private String arquivo; 
    private String capa;   

    private ArtistaResponseDTO artista; 
}