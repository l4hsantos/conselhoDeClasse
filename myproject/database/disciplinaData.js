import db from './database';

export function buscarDisciplinas(){

return db.getAllSync(`

SELECT

disciplina.idDisciplina,
disciplina.nome,
usuario.nome AS professor,
disciplina.idProfessor

FROM disciplina

LEFT JOIN professor

ON disciplina.idProfessor = professor.idUsuario

LEFT JOIN usuario

ON professor.idUsuario = usuario.idUsuario

ORDER BY disciplina.nome

`);

}

export function inserirDisciplina(
  nome,
  idProfessor
) {

  const dataRegistro = new Date()
    .toISOString()
    .substring(0, 10);

  db.runSync(
    `
    INSERT INTO disciplina
    (
      nome,
      dataRegistro,
      idProfessor
    )
    VALUES (?, ?, ?)
    `,
    [
      nome,
      dataRegistro,
      Number(idProfessor)
    ]
  );

}

export function atualizarDisciplina(
  idDisciplina,
  nome,
  idProfessor
) {

  db.runSync(
    `
    UPDATE disciplina
    SET
      nome=?,
      idProfessor=?
    WHERE idDisciplina=?
    `,
    [
      nome,
      Number(idProfessor),
      Number(idDisciplina)
    ]
  );

}

export function excluirDisciplina(idDisciplina) {

  db.runSync(
    `
    DELETE FROM disciplina
    WHERE idDisciplina=?
    `,
    [Number(idDisciplina)]
  );

}