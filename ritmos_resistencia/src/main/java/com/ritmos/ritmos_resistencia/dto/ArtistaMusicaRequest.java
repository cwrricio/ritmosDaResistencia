package com.ritmos.ritmos_resistencia.dto;

import com.ritmos.ritmos_resistencia.model.Artista; 
import com.ritmos.ritmos_resistencia.model.Musica;   
import com.ritmos.ritmos_resistencia.model.Usuario;
import lombok.AllArgsConstructor; 
import lombok.Data; 
import lombok.NoArgsConstructor; 

@Data 
@NoArgsConstructor 
@AllArgsConstructor 
public class ArtistaMusicaRequest {
    private Usuario usuario; 
    private Artista artista; 
    private Musica musica;  
}