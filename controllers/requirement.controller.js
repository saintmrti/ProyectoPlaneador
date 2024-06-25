const xlsx = require("xlsx");
const _ = require("lodash");

module.exports.parseRequirement = (fileContent) => {
  const sheetName = "Celda";

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
    return _.map(datosExtraidos, (item) => ({
      sku: item[0] ? item[0].toString() : null,
      descripcion: typeof item[1] === "string" ? item[1] : "",
      linea: typeof item[2] === "string" ? item[2] : "",
      origen: typeof item[3] === "string" ? item[3] : "",
      bptmy_maximo: item[4] || 0,
      bptmy_minimo: item[5] || 0,
      cedmty: item[6] || 0,
      cedchih: item[7] || 0,
      cedlan: item[8] || 0,
      cedgdl: item[9] || 0,
      cedcul: item[10] || 0,
      cedtij: item[11] || 0,
      cedmer: item[12] || 0,
      cedleon: item[13] || 0,
      cedver: item[14] || 0,
      cedmex: item[15] || 0,
      cedtep: item[16] || 0,
      qyq: item[17] || 0,
      carnemart: item[18] || 0,
      total: item[19] || 0,
    }));
  }
  const filasAExtraer = Array.from({ length: 117 }, (_, index) => index + 6);
  const columnasAExtraer = Array.from({ length: 20 }, (_, index) =>
    xlsx.utils.encode_col(index + 1)
  );
  const sheet = leerArchivoExcel(fileContent, sheetName);
  const datosExtraidos = extraerDatos(sheet, filasAExtraer, columnasAExtraer);
  const datosAgrupados = agruparDatos(datosExtraidos);
  return datosAgrupados;
};

module.exports.uploadRequirement = async (cn, res, data, date) => {
  try {
    const cleanData = data.filter(
      (obj) =>
        !Object.values(obj).every((val) => val === null || val === undefined)
    );

    const values = cleanData
      .map(
        (item) =>
          `('${item.sku}', '${item.descripcion}', '${item.linea}', '${item.origen}', ${item.bptmy_maximo}, ${item.bptmy_minimo}, ${item.cedmty}, ${item.cedchih}, ${item.cedlan}, ${item.cedgdl}, ${item.cedcul}, ${item.cedtij}, ${item.cedmer}, ${item.cedleon}, ${item.cedver}, ${item.cedmex}, ${item.cedtep}, ${item.qyq}, ${item.carnemart}, ${item.total}, '${date}')`
      )
      .join(",");

    await cn.query(`
      INSERT INTO Qualtia_Planeacion_requerimiento 
      (producto, descripcion, linea, origen, bptmy_maximo, bptmy_minimo, cedmty, cedchih, cedlan, cedgdl, cedcul, cedtij, cedmer, cedleon, cedver, cedmex, cedtep, QyQ, carnemart, total, fecha)
      VALUES ${values}
  `);
  } catch (error) {
    console.log(error);
    res.json({
      isError: true,
      status: "Error al subir los datos en requerimiento",
    });
  }
};

module.exports.requirementExist = async (conn, date) => {
  const { data } = await conn.query(`
    IF exists 
      (SELECT id FROM Qualtia_Planeacion_requerimiento 
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
