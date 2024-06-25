const xlsx = require("xlsx");
const moment = require("moment-timezone");
const _ = require("lodash");

module.exports.parseMinKgs = (fileContent) => {
  const sheetName = "REQ PROD";

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
    const filasAgrupadas = [];
    const encabezados = datosExtraidos[0];

    for (let i = 1; i < datosExtraidos.length; i++) {
      const fila = {};
      encabezados.forEach((encabezado, index) => {
        const nombreColumna = encabezado.toString();
        fila[nombreColumna] = datosExtraidos[i][index] || 0;
      });

      filasAgrupadas.push(fila);
    }
    return filasAgrupadas;
  }

  const filasAExtraer = Array.from({ length: 135 }, (_, index) => index + 6);
  const columnasAExtraer = Array.from({ length: 6 }, (_, index) =>
    xlsx.utils.encode_col(index)
  );

  const sheet = leerArchivoExcel(fileContent, sheetName);
  const datosExtraidos = extraerDatos(sheet, filasAExtraer, columnasAExtraer);
  const datosAgrupados = agruparDatos(datosExtraidos, columnasAExtraer);
  return datosAgrupados;
};
