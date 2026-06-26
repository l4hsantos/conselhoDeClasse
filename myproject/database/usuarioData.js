import db from './database';

export function inserirUsuario(nome, email, senha, perfil) {

  const resultado = db.runSync(
    `
    INSERT INTO usuario
    (nome, email, senha, perfil)
    VALUES (?, ?, ?, ?)
    `,
    [nome, email, senha, perfil]
  );

  return resultado.lastInsertRowId;
}

export function buscarUsuario(email, senha) {

  return db.getFirstSync(
    `
    SELECT *
    FROM usuario
    WHERE email = ?
    AND senha = ?
    `,
    [email, senha]
  );

}


export function buscarUsuarioPorId(idUsuario) {

  return db.getFirstSync(
    `
    SELECT *
    FROM usuario
    WHERE idUsuario = ?
    `,
    [idUsuario]
  );

}