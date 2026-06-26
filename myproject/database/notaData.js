import db from './database';

export function buscarNotas() {
  return db.getAllSync(`
    SELECT
      n.idNota,
      n.valor,
      n.unidade,
      n.dataRegistro,
      a.nome AS aluno,
      a.matricula,
      d.nome AS disciplina,
      d.idDisciplina
    FROM nota n
    INNER JOIN aluno a
      ON a.matricula = n.matricula
    INNER JOIN disciplina d
      ON d.idDisciplina = n.idDisciplina
    ORDER BY a.nome
  `);
}

export function inserirNota(
  valor,
  unidade,
  dataRegistro,
  matricula,
  idDisciplina
) {

  db.runSync(
    `
    INSERT INTO nota
    (
      valor,
      unidade,
      dataRegistro,
      matricula,
      idDisciplina
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      Number(valor),
      Number(unidade),
      dataRegistro,
      Number(matricula),
      Number(idDisciplina)
    ]
  );

}

export function atualizarNota(
  idNota,
  valor,
  unidade,
  dataRegistro,
  matricula,
  idDisciplina
) {

  db.runSync(
    `
    UPDATE nota
    SET
      valor=?,
      unidade=?,
      dataRegistro=?,
      matricula=?,
      idDisciplina=?
    WHERE idNota=?
    `,
    [
      Number(valor),
      Number(unidade),
      dataRegistro,
      Number(matricula),
      Number(idDisciplina),
      Number(idNota)
    ]
  );

}

export function excluirNota(idNota) {

  db.runSync(
    `
    DELETE FROM nota
    WHERE idNota=?
    `,
    [Number(idNota)]
  );

}