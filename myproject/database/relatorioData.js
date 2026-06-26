import db from './database';

export function buscarRelatorioAlunos() {
  return db.getAllSync(`
    SELECT *
    FROM aluno
    ORDER BY nome
  `);
}

export function buscarRelatorioNotas() {
  return db.getAllSync(`
    SELECT *
    FROM nota
  `);
}

export function buscarRelatorioFaltas() {
  return db.getAllSync(`
    SELECT *
    FROM falta
  `);
}