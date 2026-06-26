import db from './database';

export function buscarFaltas() {

  return db.getAllSync(`
    SELECT
      falta.idFalta,
      falta.quantidade,
      falta.dataRegistro,
      aluno.nome AS aluno,
      disciplina.nome AS disciplina,
      falta.matricula,
      falta.idDisciplina
    FROM falta

    INNER JOIN aluno
      ON falta.matricula = aluno.matricula

    INNER JOIN disciplina
      ON falta.idDisciplina = disciplina.idDisciplina

    ORDER BY aluno.nome
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