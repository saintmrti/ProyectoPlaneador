const moment = require("moment-timezone");

module.exports.getSummary = async (conn, date) => {
  const { data: productos } = await conn.query(`
    SELECT * FROM Qualtia_Planeacion_cat_sku;
  `);

  const { data: inv_nacional } = await conn.query(`
    SELECT * FROM Qualtia_Planeacion_inv_nacional
    WHERE CONVERT(date, fecha) = '${date}';
  `);

  const { data: requirement } = await conn.query(`
    SELECT * FROM Qualtia_Planeacion_requerimiento
    WHERE CONVERT(date, fecha) BETWEEN '${moment(date)
      .subtract(1, "days")
      .format("YYYY-MM-DD")}' AND '${date}';
  `);

  const { data: wip_programa } = await conn.query(`
    SELECT * FROM Qualtia_Planeacion_wip
    WHERE CONVERT(date, fecha) = '${date}';
  `);

  const { data: pr } = await conn.query(`
    SELECT * FROM Qualtia_Planeacion_ordenes
    WHERE CONVERT(date, fecha) =  '${moment(date)
      .subtract(1, "days")
      .format("YYYY-MM-DD")}';
  `);

  // const { data: KgCarga } = await conn.query(`
  //   SELECT * FROM Qualtia_Planeacion_min_kg_carga
  //   WHERE CONVERT(date, fecha) = '2024-01-25';
  // `);

  const { data: sem } = await conn.query(`
    SELECT * FROM Qualtia_Planeacion_14weeks
    WHERE CONVERT(date, fecha) = '${date}';
  `);

  return {
    productos,
    inv_nacional,
    requirement,
    wip_programa,
    pr,
    sem,
  };
};

// module.exports.insertInventory = async (conn, invNacional) => {
//   if (invNacional.length > 0) {
//     await conn.query(`
//         INSERT INTO Qualtia_Planeacion_pedido (fecha, idProducto, inv_bpt, inv_cedis, bpt_cedis, tiendita, prox_salida, min_kg_carga, salida_hoy, wip_programa_hoy) VALUES
//         ${invNacional
//           .map(
//             ({
//               id,
//               inv_bpt,
//               inv_cedis,
//               bpt_cedis,
//               tiendita,
//               prox_salida,
//               min_kg_carga,
//               salida_hoy,
//               wip_programa_hoy,
//             }) =>
//               `('2023-12-01', ${id}, ${inv_bpt}, ${inv_cedis}, ${bpt_cedis}, ${tiendita}, ${prox_salida}, ${min_kg_carga}, ${salida_hoy}, ${wip_programa_hoy})`
//           )
//           .join(",")}
//       `);
//     const { data } = await conn.query(`
//       SELECT * FROM Qualtia_Planeacion_pedido WHERE fecha = '2023-12-01';
//     `);
//     return data;
//   }
// };
