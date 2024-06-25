const moment = require("moment-timezone");

module.exports.getRequirements = async (conn, date) => {
  const startDay = moment(date).startOf("week").format("YYYY-MM-DD");
  const endDay = moment(date)
    .endOf("week")
    .subtract(1, "day")
    .format("YYYY-MM-DD");
  const { data: pedido } = await conn.query(`
    SELECT p.id as idOrden, p.pedido, p.fecha, p.ajuste_carga, p.destino, p.ajuste_carga_extra,
    p.destino_doble, p.dividir, c.id as idProducto, c.producto FROM Qualtia_Planeacion_ordenes AS p
    INNER JOIN Qualtia_Planeacion_cat_sku AS c
    ON c.id = p.idProducto
    WHERE CAST(fecha AS DATE) = '${date}';
  `);
  const { data: pedidos } = await conn.query(`
    SELECT p.id as idOrden, p.pedido, p.fecha, p.ajuste_carga, p.destino, p.ajuste_carga_extra,
    p.destino_doble, p.dividir, c.id as idProducto, c.producto FROM Qualtia_Planeacion_ordenes AS p
    INNER JOIN Qualtia_Planeacion_cat_sku AS c
    ON c.id = p.idProducto
    WHERE CAST(fecha AS DATE) BETWEEN '${startDay}' AND '${endDay}';
  `);
  return {
    pedido,
    pedidos,
  };
};

module.exports.insertRequirement = async (conn, { products, date }) => {
  dateTime = moment(date).format("YYYY-MM-DD HH:mm:ss");
  const startDay = moment(date).startOf("week").format("YYYY-MM-DD");
  const endDay = moment(date)
    .endOf("week")
    .subtract(1, "day")
    .format("YYYY-MM-DD");

  await conn.query(`
    DELETE FROM Qualtia_Planeacion_ordenes WHERE CAST(fecha AS DATE) = '${date}';
  `);

  await conn.query(`
    INSERT INTO Qualtia_Planeacion_ordenes (fecha, idProducto, ajuste_carga, pedido, destino, ajuste_carga_extra,
      destino_doble, dividir) VALUES
    ${products
      .map(
        (product) =>
          `('${dateTime}', ${product.idProducto}, ${product.ajuste_carga}, ${
            product.pedido
          }, '${product.destino}', ${
            product.ajuste_carga_extra === 0 ? null : product.ajuste_carga_extra
          }, ${
            product.destino_doble === "" ? null : `'${product.destino_doble}'`
          }, ${product.dividir ? 1 : 0})`
      )
      .join(",")} 
  `);

  const { data: pedido } = await conn.query(`
    SELECT p.id as idOrden, p.pedido, p.fecha, p.ajuste_carga, p.destino, p.ajuste_carga_extra,
    p.destino_doble, p.dividir, c.id as idProducto, c.producto FROM Qualtia_Planeacion_ordenes AS p
    INNER JOIN Qualtia_Planeacion_cat_sku AS c
    ON c.id = p.idProducto
    WHERE CAST(fecha AS DATE) = '${date}';
  `);
  const { data: pedidos } = await conn.query(`
    SELECT p.id as idOrden, p.pedido, p.fecha, p.ajuste_carga, p.destino, p.ajuste_carga_extra,
    p.destino_doble, p.dividir, c.id as idProducto, c.producto FROM Qualtia_Planeacion_ordenes AS p
    INNER JOIN Qualtia_Planeacion_cat_sku AS c
    ON c.id = p.idProducto
    WHERE CAST(fecha AS DATE) BETWEEN '${startDay}' AND '${endDay}';
  `);
  return {
    pedido,
    pedidos,
  };
};
