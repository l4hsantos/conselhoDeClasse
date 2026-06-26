import db from './database';

export function buscarFaltas() {
  return db.getAllSync(`
    SELECT *
    FROM falta
    ORDER BY dataRegistro DESC
  `);
}

export function inserirFalta(
  quantidade,
  dataRegistro,
  matricula,
  idDisciplina
) {
  db.runSync(
    `
    INSERT INTO falta
    (
      quantidade,
      dataRegistro,
      matricula,
      idDisciplina
    )
    VALUES (?, ?, ?, ?)
    `,
    [
      Number(quantidade),
      dataRegistro,
      Number(matricula),
      Number(idDisciplina)
    ]
  );
}

export function atualizarFalta(
  idFalta,
  quantidade,
  dataRegistro,
  matricula,
  idDisciplina
) {
  db.runSync(
    `
    UPDATE falta
    SET
      quantidade=?,
      dataRegistro=?,
      matricula=?,
      idDisciplina=?
    WHERE idFalta=?
    `,
    [
      Number(quantidade),
      dataRegistro,
      Number(matricula),
      Number(idDisciplina),
      Number(idFalta)
    ]
  );
}

export function excluirFalta(idFalta) {
  db.runSync(
    `
    DELETE FROM falta
    WHERE idFalta=?
    `,
    [Number(idFalta)]
  );
}