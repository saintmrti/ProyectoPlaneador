const xlsx = require("xlsx");
const _ = require("lodash");

module.exports.parseWeeks = (fileContent) => {
  const sheetName = "14W";
  const registros = [];

  function leerArchivoExcel(fileContent, sheetName) {
    const workbook = xlsx.read(fileContent, { type: "buffer" });
    const sheet = workbook.Sheets[sheetName];
    return sheet;
  }

  function extraerDatos(sheet, filasAExtraer, columnasAExtraer) {
    const datosExtraidos = [];

    filasAExtraer.forEach((fila) => {
      const filaActual = [];
      columnasAExtraer.forEach((columna) => {
        const celda = sheet[`${columna}${fila}`];
        filaActual.push(celda ? celda.v : "");
      });
      datosExtraidos.push(filaActual);
    });

    return datosExtraidos;
  }

  function agruparDatos(datosExtraidos) {
    _.forEach(datosExtraidos, function (register) {
      const producto = {
        sku: register[0],
        descripcion: register[1],
        plan_ajustado: register[7],
      };
      registros.push(producto);
    });
  }
  const filasAExtraer = Array.from({ length: 144 }, (_, index) => index + 13);
  const columnasAExtraer = Array.from({ length: 16 - 6 }, (_, index) =>
    xlsx.utils.encode_col(index + 3)
  );

  const sheet = leerArchivoExcel(fileContent, sheetName);
  const datosExtraidos = extraerDatos(sheet, filasAExtraer, columnasAExtraer);
  agruparDatos(datosExtraidos);
  const productosFiltrados = registros.filter(
    (producto) =>
      producto.sku !== "" &&
      producto.descripcion !== "" &&
      producto.plan_ajustado !== "" &&
      producto.plan_ajustado !== "Plan Ajustado" &&
      producto.sku !== "Sku" &&
      typeof producto.descripcion === "string" &&
      !/^[\d.]+$/.test(producto.descripcion.trim())
  );
  return productosFiltrados;
};

module.exports.uploadWeeks = async (cn, res, data, date) => {
  const cleanData = data
    .filter(
      (obj) =>
        !Object.values(obj).every((val) => val === undefined || val === "")
    )
    .map((obj) => {
      return {
        sku: obj.sku,
        descripcion: obj.descripcion,
        plan_ajustado: parseInt(obj.plan_ajustado) || 0,
      };
    });

  const values = cleanData
    .map(
      (item) =>
        `('${item.sku}', '${item.descripcion}', ${item.plan_ajustado},'${date}')`
    )
    .join(",");

  await cn.query(`
    INSERT INTO Qualtia_Planeacion_14weeks
    (producto, descripcion, plan_ajustado, fecha)
    VALUES ${values}
  `);
};

module.exports.weeksExist = async (conn, date) => {
  const { data } = await conn.query(`
      IF exists 
        (SELECT id FROM Qualtia_Planeacion_14weeks 
          WHERE CAST(fecha as date) = '${date}')
      BEGIN
          SELECT 1 AS result;
      END
      ELSE
      BEGIN
          SELECT 2 AS result;
      END
    `);
  return data[0].result;
};
