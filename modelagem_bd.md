CREATE DATABASE sistema_escolar;
USE sistema_escolar;

-- TABELA USUARIO --
CREATE TABLE usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    perfil ENUM('professor', 'coordenador', 'diretor') NOT NULL
);


-- TABELA PROFESSOR --

CREATE TABLE professor (
    idUsuario INT PRIMARY KEY,
    FOREIGN KEY (idUsuario)
    REFERENCES usuario(idUsuario)
);


-- TABELA COORDENADOR --

CREATE TABLE coordenador (
    idUsuario INT PRIMARY KEY,
    FOREIGN KEY (idUsuario)
    REFERENCES usuario(idUsuario)
);


-- TABELA DIRETOR --

CREATE TABLE diretor (
    idUsuario INT PRIMARY KEY,
    FOREIGN KEY (idUsuario)
    REFERENCES usuario(idUsuario)
);


-- TABELA TURMA --
CREATE TABLE turma (
    idTurma INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    anoLetivo INT NOT NULL
);


-- TABELA ALUNO --
CREATE TABLE aluno (
    matricula INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    dataNascimento DATE NOT NULL,
    anoLetivo INT NOT NULL,
    media DECIMAL(5,2),
    frequencia DECIMAL(5,2),
    situacao VARCHAR(50),
    idTurma INT,
    FOREIGN KEY (idTurma)
    REFERENCES turma(idTurma)
);

-- TABELA DISCIPLINA --
CREATE TABLE disciplina (
    idDisciplina INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    dataRegistro DATE NOT NULL,
    idProfessor INT,
    FOREIGN KEY (idProfessor)
    REFERENCES professor(idUsuario)
);


-- TABELA NOTA --
CREATE TABLE nota (
    idNota INT AUTO_INCREMENT PRIMARY KEY,
    valor DECIMAL(5,2) NOT NULL,
    unidade INT NOT NULL,
    dataRegistro DATE NOT NULL,
    matricula INT,
    idDisciplina INT,
    FOREIGN KEY (matricula)
    REFERENCES aluno(matricula),
    FOREIGN KEY (idDisciplina)
    REFERENCES disciplina(idDisciplina)
);


-- TABELA FALTA --

CREATE TABLE falta (
    idFalta INT AUTO_INCREMENT PRIMARY KEY,
    quantidade INT NOT NULL,
    dataRegistro DATE NOT NULL,
    matricula INT,
    idDisciplina INT,
    FOREIGN KEY (matricula)
    REFERENCES aluno(matricula),
    FOREIGN KEY (idDisciplina)
    REFERENCES disciplina(idDisciplina)
);

-- TABELA OBSERVAÇÃO -- 
CREATE TABLE observacao (
    idObservacao INT AUTO_INCREMENT PRIMARY KEY,
    descricao TEXT NOT NULL,
    data DATE NOT NULL,
    
-- atributos do anexo --
    nomeArquivo VARCHAR(100),
    tipoArquivo VARCHAR(50),
    dataUpload DATE,
    matricula INT,
    FOREIGN KEY (matricula)
    REFERENCES aluno(matricula)
);


-- TABELA CONSELHO_CLASSE --
CREATE TABLE conselho_classe (
    idConselho INT AUTO_INCREMENT PRIMARY KEY,
    data DATE NOT NULL,
    justificativa TEXT,
    matricula INT,
    FOREIGN KEY (matricula)
    REFERENCES aluno(matricula)
);


-- TABELA LOG_ALTERACAO --
CREATE TABLE log_alteracao (
    idLog INT AUTO_INCREMENT PRIMARY KEY,
    data DATE NOT NULL,
    hora TIME NOT NULL,
    acao VARCHAR(100) NOT NULL,
    idUsuario INT,
    FOREIGN KEY (idUsuario)
    REFERENCES usuario(idUsuario)
);
