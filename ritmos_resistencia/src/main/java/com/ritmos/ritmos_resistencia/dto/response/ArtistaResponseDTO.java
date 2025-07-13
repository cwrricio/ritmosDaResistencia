package com.ritmos.ritmos_resistencia.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArtistaResponseDTO {
    private Long idArtista;
    private String nomeArtistico;
    private String biografia;
    private String instagram;
    private String spotify;

}