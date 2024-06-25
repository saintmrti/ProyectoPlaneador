module.exports.getSummary = async (conn) => {
  const { data } = await conn.query(`
    SELECT r.id, r.idSku, c.sku, c.descripcion, r.idEmpacadora, r.ciclos_minutos, r.kg_paquete,
    r.paquetes_avance FROM Qualtia_Capacidad_rebanados as r
    INNER JOIN Qualtia_Capacidad_cat_sku as c
    ON r.idSku = c.id;
    `);
  return data;
};

module.exports.insertParameters = async (
  conn,
  { idSku, idEmpacadora, ciclos_minutos, kg_paquete, paquetes_avance }
) => {
  const {
    info: { insertId },
  } = await conn.query(`
    INSERT INTO Qualtia_Capacidad_rebanados (idSku, idEmpacadora, ciclos_minutos, kg_paquete, paquetes_avance)
    VALUES (${idSku}, ${idEmpacadora}, ${parseFloat(
    ciclos_minutos
  )}, ${parseFloat(kg_paquete)}, ${parseInt(paquetes_avance)});
  `);
  const { data } = await conn.query(`
    SELECT r.id, r.idSku, c.sku, c.descripcion, r.idEmpacadora, r.ciclos_minutos, r.kg_paquete,
    r.paquetes_avance FROM Qualtia_Capacidad_rebanados as r
    INNER JOIN Qualtia_Capacidad_cat_sku as c
    ON r.idSku = c.id
    WHERE r.id = ${insertId};
  `);
  return data[0];
};

module.exports.updateParameters = async (
  conn,
  { idSku, ciclos_minutos, kg_paquete, paquetes_avance }
) => {
  await conn.query(`
    UPDATE Qualtia_Capacidad_rebanados
    SET ciclos_minutos = ${ciclos_minutos},
    kg_paquete = ${kg_paquete},
    paquetes_avance = ${paquetes_avance}
    WHERE id = ${idSku};
  `);
  const { data } = await conn.query(`
    SELECT r.id, r.idSku, c.sku, c.descripcion, r.idEmpacadora, r.ciclos_minutos, r.kg_paquete,
    r.paquetes_avance FROM Qualtia_Capacidad_rebanados as r
    INNER JOIN Qualtia_Capacidad_cat_sku as c
    ON r.idSku = c.id
    WHERE r.id = ${idSku};
  `);
  return data[0];
};

module.exports.deleteParameters = async (conn, idSku) => {
  await conn.query(`
    DELETE FROM Qualtia_Capacidad_rebanados
    WHERE id = ${idSku};
  `);
  return idSku;
};
