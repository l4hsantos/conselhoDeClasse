import db from './database';

export function buscarObservacoes() {

  return db.getAllSync(`
    SELECT *
    FROM observacao
    ORDER BY data DESC
  `);

}

export function inserirObservacao(
  descricao,
  data,
  nomeArquivo,
  tipoArquivo,
  dataUpload,
  matricula
) {

  db.runSync(
    `
    INSERT INTO observacao
    (
      descricao,
      data,
      nomeArquivo,
      tipoArquivo,
      dataUpload,
      matricula
    )
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      descricao,
      data,
      nomeArquivo,
      tipoArquivo,
      dataUpload,
      Number(matricula)
    ]
  );

}

export function atualizarObservacao(
  idObservacao,
  descricao,
  data,
  nomeArquivo,
  tipoArquivo,
  dataUpload,
  matricula
) {

  db.runSync(
    `
    UPDATE observacao
    SET
      descricao=?,
      data=?,
      nomeArquivo=?,
      tipoArquivo=?,
      dataUpload=?,
      matricula=?
    WHERE idObservacao=?
    `,
    [
      descricao,
      data,
      nomeArquivo,
      tipoArquivo,
      dataUpload,
      Number(matricula),
      Number(idObservacao)
    ]
  );

}

export function excluirObservacao(idObservacao) {

  db.runSync(
    `
    DELETE FROM observacao
    WHERE idObservacao=?
    `,
    [Number(idObservacao)]
  );

}