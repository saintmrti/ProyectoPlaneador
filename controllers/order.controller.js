const xlsx = require("xlsx");
const _ = require("lodash");

module.exports.parseOrder = (fileContent) => {
  const sheetName = "WIP JAM";

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
    const datosFiltrados = datosExtraidos.filter(
      (item) => item[1] !== null && item[1] !== undefined && item[1] !== ""
    );
    const wip_jam = _.map(datosFiltrados, (item) => ({
      peso_promedio: parseFloat(item[0]) || 0,
      producto: item[1] ? item[1].toString() : null,
      descripcion: typeof item[2] === "string" ? item[2] : "",
      cocer_embutido: parseFloat(item[3]) || 0,
      cocimiento: parseFloat(item[4]) || 0,
      enfriamiento: parseFloat(item[5]) || 0,
      madurado: parseFloat(item[6]) || 0,
      camaras: parseFloat(item[7]) || 0,
      empaque: parseFloat(item[8]) || 0,
      incompletas: parseFloat(item[9]) || 0,
      retenidas: parseFloat(item[10]) || 0,
      total_piezas: parseFloat(item[11]) || 0,
      canastillas: parseFloat(item[12]) || 0,
      tarimas: parseFloat(item[13]) || 0,
      total_Kilos: parseFloat(item[14]) || 0,
    }));
    return wip_jam;
  }

  const filasAExtraer = Array.from({ length: 80 }, (_, index) => index + 6);
  const columnasAExtraer = Array.from({ length: 15 }, (_, index) =>
    xlsx.utils.encode_col(index)
  );

  const sheet = leerArchivoExcel(fileContent, sheetName);
  const datosExtraidos = extraerDatos(sheet, filasAExtraer, columnasAExtraer);
  const datosAgrupados = agruparDatos(datosExtraidos);
  return datosAgrupados;
};

module.exports.uploadOrder = async (cn, res, data, date) => {
  try {
    const transformData = _.map(data, (item) => ({
      ...item,
      fecha: date,
    }));

    const values = transformData
      .map(
        (item) =>
          `(${item.peso_promedio}, '${item.producto}','${item.descripcion}',
            ${item.cocer_embutido}, ${item.cocimiento}, ${item.enfriamiento},
            ${item.madurado}, ${item.camaras}, ${item.empaque}, ${item.incompletas},
            ${item.retenidas}, ${item.total_piezas}, ${item.canastillas}, 
            ${item.tarimas}, ${item.total_Kilos}, '${item.fecha}')`
      )
      .join(",");
    await cn.query(`
        INSERT INTO Qualtia_Planeacion_wip
        (peso_promedio, producto, descripcion, cocer_embutido, cocimiento, enfriamiento, madurado, camaras, empaque, incompletas, repetidas, total_piezas, canastillas, tarimas, total_Kilos, fecha)
        VALUES ${values}
    `);
  } catch (error) {
    console.log(error);
    res.json({ isError: true, status: "Error al subir los datos en pedido" });
  }
};

module.exports.orderExist = async (conn, date) => {
  const { data } = await conn.query(`
      IF exists 
        (SELECT id FROM Qualtia_Planeacion_wip 
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
