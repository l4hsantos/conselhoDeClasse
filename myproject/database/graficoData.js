import db from './database';

export function buscarIndicadores() {

  const totalAlunos = db.getFirstSync(`
    SELECT COUNT(*) AS total
    FROM aluno
  `).total;

  const totalNotas = db.getFirstSync(`
    SELECT COUNT(*) AS total
    FROM nota
  `).total;

  const mediaGeral = db.getFirstSync(`
    SELECT AVG(valor) AS media
    FROM nota
  `);

  const frequenciaMedia = db.getFirstSync(`
    SELECT AVG(frequencia) AS media
    FROM aluno
  `);

  return {
    totalAlunos,
    totalNotas,
    mediaGeral: mediaGeral.media || 0,
    frequenciaMedia: frequenciaMedia.media || 0
  };

}