import db from './database';

export function initDatabase() {
  try {

    db.execSync(`

      PRAGMA foreign_keys = ON;

      /* ===========================
         TABELA USUARIO
      =========================== */

      CREATE TABLE IF NOT EXISTS usuario (
        idUsuario INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL,
        perfil TEXT NOT NULL
      );

      /* ===========================
         TABELA PROFESSOR
      =========================== */

      CREATE TABLE IF NOT EXISTS professor (
        idUsuario INTEGER PRIMARY KEY,
        FOREIGN KEY (idUsuario)
        REFERENCES usuario(idUsuario)
      );

      /* ===========================
         TABELA COORDENADOR
      =========================== */

      CREATE TABLE IF NOT EXISTS coordenador (
        idUsuario INTEGER PRIMARY KEY,
        FOREIGN KEY (idUsuario)
        REFERENCES usuario(idUsuario)
      );

      /* ===========================
         TABELA DIRETOR
      =========================== */

      CREATE TABLE IF NOT EXISTS diretor (
        idUsuario INTEGER PRIMARY KEY,
        FOREIGN KEY (idUsuario)
        REFERENCES usuario(idUsuario)
      );

      /* ===========================
         TABELA TURMA
      =========================== */

      CREATE TABLE IF NOT EXISTS turma (
        idTurma INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        anoLetivo INTEGER NOT NULL
      );

      /* ===========================
         TABELA ALUNO
      =========================== */

      CREATE TABLE IF NOT EXISTS aluno (
        matricula INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        dataNascimento TEXT NOT NULL,
        anoLetivo INTEGER NOT NULL,
        media REAL,
        frequencia REAL,
        situacao TEXT,
        idTurma INTEGER,
        FOREIGN KEY (idTurma)
        REFERENCES turma(idTurma)
      );

      /* ===========================
         TABELA DISCIPLINA
      =========================== */

      CREATE TABLE IF NOT EXISTS disciplina (
        idDisciplina INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        dataRegistro TEXT NOT NULL,
        idProfessor INTEGER,
        FOREIGN KEY (idProfessor)
        REFERENCES professor(idUsuario)
      );

      /* ===========================
         TABELA NOTA
      =========================== */

      CREATE TABLE IF NOT EXISTS nota (
        idNota INTEGER PRIMARY KEY AUTOINCREMENT,
        valor REAL NOT NULL,
        unidade INTEGER NOT NULL,
        dataRegistro TEXT NOT NULL,
        matricula INTEGER,
        idDisciplina INTEGER,
        FOREIGN KEY (matricula)
        REFERENCES aluno(matricula),
        FOREIGN KEY (idDisciplina)
        REFERENCES disciplina(idDisciplina)
      );

      /* ===========================
         TABELA FALTA
      =========================== */

      CREATE TABLE IF NOT EXISTS falta (
        idFalta INTEGER PRIMARY KEY AUTOINCREMENT,
        quantidade INTEGER NOT NULL,
        dataRegistro TEXT NOT NULL,
        matricula INTEGER,
        idDisciplina INTEGER,
        FOREIGN KEY (matricula)
        REFERENCES aluno(matricula),
        FOREIGN KEY (idDisciplina)
        REFERENCES disciplina(idDisciplina)
      );

      /* ===========================
         TABELA OBSERVACAO
      =========================== */

      CREATE TABLE IF NOT EXISTS observacao (
        idObservacao INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao TEXT NOT NULL,
        data TEXT NOT NULL,
        nomeArquivo TEXT,
        tipoArquivo TEXT,
        dataUpload TEXT,
        matricula INTEGER,
        FOREIGN KEY (matricula)
        REFERENCES aluno(matricula)
      );

      /* ===========================
         TABELA CONSELHO_CLASSE
      =========================== */

      CREATE TABLE IF NOT EXISTS conselho_classe (
        idConselho INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT NOT NULL,
        justificativa TEXT,
        matricula INTEGER,
        FOREIGN KEY (matricula)
        REFERENCES aluno(matricula)
      );

      /* ===========================
         TABELA LOG_ALTERACAO
      =========================== */

      CREATE TABLE IF NOT EXISTS log_alteracao (
        idLog INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT NOT NULL,
        hora TEXT NOT NULL,
        acao TEXT NOT NULL,
        idUsuario INTEGER,
        FOREIGN KEY (idUsuario)
        REFERENCES usuario(idUsuario)
      );

    `);

    console.log('Banco de dados inicializado com sucesso!');

  } catch (error) {
    console.log('Erro ao criar banco:', error);
  }
}