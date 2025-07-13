# 🎶 Ritmos da Resistência ✊

Bem-vindo(a) ao **Ritmos da Resistência**! Uma plataforma web dedicada a celebrar a música negra como forma de expressão, resistência e transformação. Nosso objetivo é apoiar artistas negros independentes, dar visibilidade às suas histórias e conectar o público com a riqueza cultural da música, facilitando o apoio direto através de doações.

## ✨ Impacto Social e ODS

Este projeto está alinhado com os **Objetivos de Desenvolvimento Sustentável (ODS)** da ONU:

* **ODS 8 - Trabalho Decente e Crescimento Econômico:** Promove o crescimento econômico inclusivo e sustentável ao criar um canal de monetização para artistas independentes, gerando renda e reconhecimento para seu trabalho.
* **ODS 10 - Redução das Desigualdades:** Contribui para a redução das desigualdades ao dar voz e plataforma para artistas de grupos historicamente marginalizados, combatendo o racismo estrutural no mercado da arte e música.

## Membros:
Graziela Espindola Bitencourt

## 🚀 Tecnologias Utilizadas

### Back-end
* **Java 17:** Linguagem de programação.
* **Spring Boot (v3.x):** Framework para desenvolvimento rápido de aplicações Java.
* **Spring Data JPA:** Facilita a interação com o banco de dados.
* **Hibernate:** Implementação do JPA.
* **Spring Security Crypto:** Para hashing seguro de senhas (BCrypt).
* **Maven:** Gerenciador de dependências.
* **MySQL:** Banco de dados relacional.

### Front-end
* **React:** Biblioteca JavaScript para construção de interfaces de usuário.
* **React Router DOM:** Para roteamento na aplicação SPA (Single Page Application).
* **CSS Modules:** Para modularização e encapsulamento de estilos CSS.
* **Bootstrap 5:** Framework CSS para estilização e responsividade.
* **Fetch API:** Para requisições HTTP à API do back-end.
* **Sonner:** Para notificações (toasts).
* **Lucide React / React Icons:** Para ícones.

## 🛠️ Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:

* **Java Development Kit (JDK) 17 ou superior:**
    * [Download JDK](https://www.oracle.com/java/technologies/downloads/)
* **Apache Maven 3.6.0 ou superior:**
    * [Download Apache Maven](https://maven.apache.org/download.cgi)
    * **Instruções para configurar no PATH do Windows:**
        1.  Baixe `apache-maven-X.Y.Z-bin.zip`.
        2.  Descompacte em um local como `C:\Program Files\Apache\Maven\`.
        3.  Adicione `MAVEN_HOME` (`C:\Program Files\Apache\Maven\apache-maven-X.Y.Z`) às variáveis de ambiente do sistema.
        4.  Adicione `%MAVEN_HOME%\bin` à variável `Path` do sistema.
        5.  Reinicie seu terminal.
    * Verifique: `mvn -v`
* **Node.js 18.x ou superior e npm (ou yarn):**
    * [Download Node.js](https://nodejs.org/en/download/)
    * Verifique: `node -v` e `npm -v` (ou `yarn -v`)
* **MySQL Server 8.0 ou superior:**
    * [Download MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
    * Um cliente MySQL (ex: [MySQL Workbench](https://www.mysql.com/products/workbench/), [DBeaver](https://dbeaver.io/)).

## ⚙️ Configuração e Execução do Projeto

### **Passo 1: Clonar o Repositório**

```bash

git clone [https://github.com/seu-usuario/ritmosDaResistencia.git](https://github.com/seu-usuario/ritmosDaResistencia.git) # Substitua pelo link do seu repositório
cd ritmosDaResistencia
````
## Banco de Dados
### Modelo Entidade Relacionamento:
![image](https://github.com/user-attachments/assets/faec08b5-0c8b-43fe-8cbc-e91db33f0531)


### Modelo Lógico:
![image](https://github.com/user-attachments/assets/b732b419-7e1f-43cc-8b77-ec6d11949ab7)

### Script SQL
```bash
CREATE DATABASE IF NOT EXISTS `ritmos` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `ritmos` ;

CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` BIGINT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE, 
  `senha` VARCHAR(255) NOT NULL, 
  PRIMARY KEY (`id_usuario`)
) ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `artista` (
  `id_artista` BIGINT NOT NULL AUTO_INCREMENT, 
  `nome_artistico` VARCHAR(255) NOT NULL,
  `biografia` TEXT NULL, 
  `instagram` VARCHAR(255) NULL,
  `spotify` VARCHAR(255) NULL,
  `fk_usuario_id_usuario` BIGINT NOT NULL UNIQUE, 
  
  PRIMARY KEY (`id_artista`),
  INDEX `idx_fk_usuario_id_usuario` (`fk_usuario_id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_artista_usuario`
    FOREIGN KEY (`fk_usuario_id_usuario`)
    REFERENCES `usuario` (`id_usuario`)
    ON DELETE CASCADE   
    ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `musica` (
  `id_musica` BIGINT NOT NULL AUTO_INCREMENT,
  `nome_musica` VARCHAR(255) NOT NULL,
  `genero` VARCHAR(100) NOT NULL,
  `arquivo` VARCHAR(500) NOT NULL, 
`capa` VARCHAR(500) NOT NULL,
  `fk_artista_id_artista` BIGINT NOT NULL, 
  PRIMARY KEY (`id_musica`),
  INDEX `idx_fk_artista_id_artista` (`fk_artista_id_artista` ASC) VISIBLE,
  CONSTRAINT `fk_musica_artista`
    FOREIGN KEY (`fk_artista_id_artista`)
    REFERENCES `artista` (`id_artista`)
    ON DELETE CASCADE   
    ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `doacao` (
  `id_doacao` BIGINT NOT NULL AUTO_INCREMENT,
  `valor` DECIMAL(10, 2) NOT NULL,
  `metodo_pagamento` VARCHAR(100) NOT NULL,
  `status` VARCHAR(50) NOT NULL, 
  `mensagem` TEXT NULL, 
  `data_doacao` DATETIME NOT NULL, 
  
  `fk_doador_usuario_id_usuario` BIGINT NOT NULL, 
  `fk_recebedor_artista_id_artista` BIGINT NOT NULL, 
  
  PRIMARY KEY (`id_doacao`),
  INDEX `idx_fk_doador_usuario` (`fk_doador_usuario_id_usuario` ASC) VISIBLE,
  INDEX `idx_fk_recebedor_artista` (`fk_recebedor_artista_id_artista` ASC) VISIBLE,
  
  CONSTRAINT `fk_doacao_doador_usuario`
    FOREIGN KEY (`fk_doador_usuario_id_usuario`)
    REFERENCES `usuario` (`id_usuario`)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
    
  CONSTRAINT `fk_doacao_recebedor_artista`
    FOREIGN KEY (`fk_recebedor_artista_id_artista`)
    REFERENCES `artista` (`id_artista`)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
```



Após inserir todas as informações necessárias, não se esqueça de **adicionar sua própria senha de usuário** no arquivo `application.properties`.

Em seguida, **compile e inicie o backend**. Para isso, vá até o arquivo `RitmosResistenciaApplication.java` e execute a aplicação Spring Boot.

Assim que o backend estiver em execução, acesse a pasta `ritmos-frontend`, abra o **terminal integrado** e execute o comando:

```bash
npm start
```

O projeto será iniciado automaticamente no navegador.





