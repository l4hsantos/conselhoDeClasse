import db from './database';

export function buscarConselhos() {

  return db.getAllSync(`
    SELECT *
    FROM conselho_classe
    ORDER BY data DESC
  `);

}

export function inserirConselho(
  data,
  justificativa,
  matricula
) {

  db.runSync(
    `
    INSERT INTO conselho_classe
    (
      data,
      justificativa,
      matricula
    )
    VALUES (?, ?, ?)
    `,
    [
      data,
      justificativa,
      Number(matricula)
    ]
  );

}

export function atualizarConselho(
  idConselho,
  data,
  justificativa,
  matricula
) {

  db.runSync(
    `
    UPDATE conselho_classe
    SET
      data=?,
      justificativa=?,
      matricula=?
    WHERE idConselho=?
    `,
    [
      data,
      justificativa,
      Number(matricula),
      Number(idConselho)
    ]
  );

}

export function excluirConselho(idConselho) {

  db.runSync(
    `
    DELETE FROM conselho_classe
    WHERE idConselho=?
    `,
    [Number(idConselho)]
  );

}