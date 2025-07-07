package com.ritmos.ritmos_resistencia.repository;

import org.springframework.data.jpa.repository.JpaRepository; 
import org.springframework.stereotype.Repository;

import com.ritmos.ritmos_resistencia.model.Usuario;

@Repository 
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

}