import db from './database';

export function buscarAlunos() {
  return db.getAllSync(`
    SELECT * FROM aluno
    ORDER BY nome
  `);
}

export function inserirAluno(
  nome,
  dataNascimento,
  anoLetivo,
  media,
  frequencia,
  situacao,
  idTurma
) {

  db.runSync(
    `
    INSERT INTO aluno
    (
      nome,
      dataNascimento,
      anoLetivo,
      media,
      frequencia,
      situacao,
      idTurma
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      nome,
      dataNascimento,
      Number(anoLetivo),
      Number(media || 0),
      Number(frequencia || 0),
      situacao,
      Number(idTurma)
    ]
  );

}

export function atualizarAluno(
  matricula,
  nome,
  dataNascimento,
  anoLetivo,
  media,
  frequencia,
  situacao,
  idTurma
) {

  db.runSync(
    `
    UPDATE aluno
    SET
      nome=?,
      dataNascimento=?,
      anoLetivo=?,
      media=?,
      frequencia=?,
      situacao=?,
      idTurma=?
    WHERE matricula=?
    `,
    [
      nome,
      dataNascimento,
      Number(anoLetivo),
      Number(media || 0),
      Number(frequencia || 0),
      situacao,
      Number(idTurma),
      Number(matricula)
    ]
  );

}

export function excluirAluno(matricula) {

  db.runSync(
    `
    DELETE FROM aluno
    WHERE matricula=?
    `,
    [Number(matricula)]
  );

}