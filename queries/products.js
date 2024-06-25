module.exports.getSummary = async (conn) => {
  const { data } = await conn.query(`
    SELECT * FROM Qualtia_Planeacion_cat_sku;
  `);
  return data;
};

module.exports.updateProducts = async (conn, { id, min_kg_carga }) => {
  await conn.query(`
    UPDATE Qualtia_Planeacion_cat_sku
    SET min_kg_carga = ${min_kg_carga}
    WHERE id = ${id};
  `);

  const { data } = await conn.query(`
    SELECT * FROM Qualtia_Planeacion_cat_sku
    WHERE id = ${id};
  `);
  return data[0];
};
