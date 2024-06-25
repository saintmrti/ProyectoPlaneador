module.exports.getUserByEmail = async (conn, email) => {
  const { data: data } = await conn.query(`
    SELECT
      IdUsuarioQualtia userId,
      UserName userEmail,
      CONCAT_WS(' ', Nombre, Apellido) userName,
      Contrasena password
    FROM QualtiaUsuarios
    WHERE UserName = '${email}';
  `);
  return data[0];
};
