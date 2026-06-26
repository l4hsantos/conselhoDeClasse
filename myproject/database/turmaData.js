import db from './database';

export function buscarTurmas() {

  return db.getAllSync(`
    SELECT *
    FROM turma
    ORDER BY nome
  `);

}

export function inserirTurma(
  nome,
  anoLetivo
) {

  db.runSync(
    `
    INSERT INTO turma
    (nome, anoLetivo)
    VALUES (?, ?)
    `,
    [
      nome,
      Number(anoLetivo)
    ]
  );

}

export function atualizarTurma(
  idTurma,
  nome,
  anoLetivo
) {

  db.runSync(
    `
    UPDATE turma
    SET
      nome=?,
      anoLetivo=?
    WHERE idTurma=?
    `,
    [
      nome,
      Number(anoLetivo),
      Number(idTurma)
    ]
  );

}

export function excluirTurma(idTurma) {

  db.runSync(
    `
    DELETE FROM turma
    WHERE idTurma=?
    `,
    [Number(idTurma)]
  );

}