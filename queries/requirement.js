module.exports.getSummary = async (conn, date) => {
  const { data } = await conn.query(`
      SELECT r.id, r.idProducto, p.producto, p.linea, r.inv_bpt, r.inv_cedis, r.bpt_cedis,
      r.tiendita, r.prox_salida, r.salida_hoy, r.wip_hoy, r.programa_hoy, r.wip_programa_hoy, r.plan_ajustado
      FROM Qualtia_Planeacion_pedido AS r
      INNER JOIN Qualtia_Planeacion_cat_sku AS p
      ON r.idProducto = p.id
      WHERE CAST(fecha AS DATE)= '${date}';
    `);
  return data;
};

module.exports.insertRequirement = async (conn, { invNacional, date }) => {
  if (invNacional.length > 0) {
    await conn.query(`
        INSERT INTO Qualtia_Planeacion_pedido (fecha, idProducto, inv_bpt, inv_cedis, bpt_cedis, tiendita, prox_salida, min_kg_carga, salida_hoy, wip_hoy, programa_hoy, wip_programa_hoy, plan_ajustado) VALUES
        ${invNacional
          .map(
            ({
              id,
              inv_bpt,
              inv_cedis,
              bpt_cedis,
              tiendita,
              prox_salida,
              min_kg_carga,
              salida_hoy,
              wip_hoy,
              programa_hoy,
              wip_programa_hoy,
              plan_ajustado,
            }) =>
              `('${date}', ${id}, ${inv_bpt}, ${inv_cedis}, ${bpt_cedis}, ${tiendita}, ${prox_salida}, ${min_kg_carga}, ${salida_hoy}, ${wip_hoy}, ${programa_hoy}, ${wip_programa_hoy}, ${plan_ajustado})`
          )
          .join(",")}
      `);
    const { data } = await conn.query(`
      SELECT r.id, r.idProducto, p.producto, p.linea, r.inv_bpt, r.inv_cedis, r.bpt_cedis,
      r.tiendita, r.prox_salida, r.salida_hoy, r.wip_hoy, r.programa_hoy, r.wip_programa_hoy, r.plan_ajustado
      FROM Qualtia_Planeacion_pedido AS r
      INNER JOIN Qualtia_Planeacion_cat_sku AS p
      ON r.idProducto = p.id
      WHERE CAST(fecha AS DATE)= '${date}';
    `);
    return data;
  }
};

module.exports.deleteRequirement = async (conn, date) => {
  await conn.query(`
    DELETE FROM Qualtia_Planeacion_requerimiento
    WHERE CONVERT(date, fecha) = '${date}';
  `);

  await conn.query(`
    DELETE FROM Qualtia_Planeacion_wip
    WHERE CONVERT(date, fecha) = '${date}';
  `);

  await conn.query(`
    DELETE FROM Qualtia_Planeacion_inv_nacional
    WHERE CONVERT(date, fecha) = '${date}';
  `);

  await conn.query(`
    DELETE FROM Qualtia_Planeacion_14weeks
    WHERE CONVERT(date, fecha) = '${date}';
  `);

  await conn.query(`
    DELETE FROM Qualtia_Planeacion_pedido
    WHERE CONVERT(date, fecha) = '${date}';
  `);

  await conn.query(`
    DELETE FROM Qualtia_Planeacion_ordenes
    WHERE CONVERT(date, fecha) = '${date}';
  `);

  return {};
};
