// src/main/java/com/ritmos/ritmos_resistencia/controller/UsuarioController.java
package com.ritmos.ritmos_resistencia.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ritmos.ritmos_resistencia.dto.LoginRequest; 
import com.ritmos.ritmos_resistencia.model.Usuario; 
import com.ritmos.ritmos_resistencia.service.UsuarioService;

@RestController
@RequestMapping("/api") 
public class UsuarioController {

    private final UsuarioService usuarioService; 

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/login") 
    public ResponseEntity<Usuario> loginUsuario(@RequestBody LoginRequest loginRequest){
        Optional<Usuario> usuarioOpt = usuarioService.autenticarUsuario(loginRequest.getEmail(), loginRequest.getSenha());
        
        if(usuarioOpt.isPresent()) {
            return new ResponseEntity<>(usuarioOpt.get(), HttpStatus.OK); 
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); 
        }
    }

    @PostMapping("/usuarios") 
    public ResponseEntity<Usuario> criarUsuario(@RequestBody Usuario usuario) {
        System.out.println("DEBUG: Objeto Usuario recebido no Controller:");
        System.out.println("DEBUG: Nome: " + usuario.getNome());
        System.out.println("DEBUG: Email: " + usuario.getEmail());
        System.out.println("DEBUG: Senha: " + usuario.getSenha()); 
        Usuario novoUsuario = usuarioService.salvarUsuario(usuario);
        return new ResponseEntity<>(novoUsuario, HttpStatus.CREATED);
    }

    @GetMapping("/usuarios") 
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        List<Usuario> usuarios = usuarioService.listarTodosUsuarios();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }

    @GetMapping("/usuarios/{id}") 
    public ResponseEntity<Usuario> buscarUsuarioPorId(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarioService.buscarUsuarioPorId(id);
        return usuario.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                      .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/usuarios/{id}") 
    public ResponseEntity<Usuario> atualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioDetails) {
        Optional<Usuario> usuarioExistente = usuarioService.buscarUsuarioPorId(id);

        if (usuarioExistente.isPresent()) {
            Usuario usuario = usuarioExistente.get();
            usuario.setNome(usuarioDetails.getNome());
            usuario.setEmail(usuarioDetails.getEmail());
            usuario.setSenha(usuarioDetails.getSenha()); 

            Usuario usuarioAtualizado = usuarioService.salvarUsuario(usuario);
            return new ResponseEntity<>(usuarioAtualizado, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/usuarios/{id}") 
    public ResponseEntity<HttpStatus> deletarUsuario(@PathVariable Long id) {
        try {
            usuarioService.deletarUsuario(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); 
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
        }
    }
}