import db from './database';

export function buscarProfessores() {

  return db.getAllSync(`
    SELECT
      professor.idUsuario,
      usuario.nome
    FROM professor
    INNER JOIN usuario
      ON professor.idUsuario = usuario.idUsuario
    ORDER BY usuario.nome
  `);

}