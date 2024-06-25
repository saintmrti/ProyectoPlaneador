module.exports.getSummary = async (conn, email) => {
  const { data: data } = await conn.query(`
      SELECT id, c_nombre, c_link, c_icono, n_externo FROM Qualtia_Proyectos;
    `);
  return data;
};

module.exports.insertProject = async (conn, { c_nombre, c_link, c_icono }) => {
  const {
    info: { insertId },
  } = await conn.query(`
      INSERT INTO Qualtia_Proyectos (c_nombre, c_link, c_icono, n_externo)
      VALUES ('${c_nombre}', '${c_link}', '${c_icono}', 0);
    `);

  const { data } = await conn.query(`
      SELECT id, c_nombre, c_link, c_icono, n_externo FROM Qualtia_Proyectos WHERE id = ${insertId};
    `);
  return data[0];
};

module.exports.updateProject = async (
  conn,
  { id, c_nombre, c_link, c_icono }
) => {
  await conn.query(`
      UPDATE Qualtia_Proyectos
      SET c_nombre = '${c_nombre}', c_link = '${c_link}', c_icono = '${c_icono}'
      WHERE id = ${id};
    `);

  const { data } = await conn.query(`
      SELECT id, c_nombre, c_link, c_icono, n_externo FROM Qualtia_Proyectos WHERE id = ${id};
    `);
  return data[0];
};

module.exports.deleteProject = async (conn, id) => {
  await conn.query(`
      DELETE FROM Qualtia_Proyectos WHERE id = ${id};
    `);
  return id;
};
