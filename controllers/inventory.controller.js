const csv = require("csv-parser");
const { Readable } = require("stream");
const _ = require("lodash");
const moment = require("moment");

module.exports.parseInventory = (fileContent) => {
  return new Promise((resolve, reject) => {
    const datosCSV = [];
    const stream = fileContent.pipe
      ? fileContent
      : Readable.from([fileContent]);
    stream
      .pipe(csv())
      .on("data", (row) => {
        datosCSV.push(row);
      })
      .on("end", () => {
        const datosAgrupados = agruparDatos(datosCSV);
        resolve(datosAgrupados);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

module.exports.uploadInventory = async (cn, res, data, date) => {
  try {
    const cleanData = data.filter(
      (obj) => !Object.values(obj).every((val) => val === undefined)
    );
    const transformData = _.map(cleanData, (item) => {
      return {
        bpt:
          `${item?.Almacen?.replace(/'/g, "''")}${item?.Producto?.replace(
            /'/g,
            "''"
          )}` || null,
        cedis:
          `${item?.Almacen?.replace(/'/g, "''")}${item?.Producto?.replace(
            /'/g,
            "''"
          )}` || null,
        almacen: item?.Almacen?.replace(/'/g, "''") || null,
        producto: item?.Producto?.replace(/'/g, "''") || null,
        descripcion: item?.Descripcion?.replace(/'/g, "''") || null,
        cla: item?.Cla?.replace(/'/g, "''") || null,
        origen: item?.Origen?.replace(/'/g, "''") || null,
        inv_seguridad: parseInt(item["Inv Seguridad"]) || 0,
        inv_net_trans: parseInt(item["Inv Net + Trans"]) || 0,
        sug_nivelar: parseInt(item["Sug Nivelar IS"]) || 0,
        inv_neteable: parseInt(item["Inv Neteable"]) || 0,
        inv_disp: parseInt(item["Inv Disp"]) || 0,
        trans_real: parseInt(item["Transito Real (Emb-Rec)"]) || 0,
        punto_reorden: parseFloat(item["Punto de Reorden"]) || 0,
        fecha: date,
      };
    });
    const batchSize = 2000;
    for (let i = 0; i < transformData.length; i += batchSize) {
      const currentBatch = transformData.slice(i, i + batchSize);
      const tempTableValues = currentBatch
        .map(
          (item) => `(
       '${item.bpt}',
       '${item.cedis}',
       '${item.almacen}',
       '${item.producto}',
       '${item.descripcion}',
       '${item.cla}',
       '${item.origen}',
       ${item.inv_seguridad},
       ${item.inv_net_trans},
       ${item.sug_nivelar},
       ${item.inv_neteable},
       ${item.inv_disp},
       ${item.trans_real},
       ${item.punto_reorden},
       '${item.fecha}'
     )`
        )
        .join(",");

      await cn.query(`
        INSERT INTO Qualtia_Planeacion_inv_nacional
        (bpt, cedis, almacen, producto, descripcion, cla, origen, inv_seguridad, inv_net_trans, sug_nivelar, inv_neteable, inv_disp, transito_real, punto_reorden, fecha)
        SELECT * FROM (VALUES ${tempTableValues}) AS TempTable(bpt, cedis, almacen, producto, descripcion, cla, origen, inv_seguridad, inv_net_trans, sug_nivelar, inv_neteable,
        inv_disp, transito_real, punto_reorden, fecha)
      `);
    }
  } catch (error) {
    console.log(error);
    res.json({
      isError: true,
      status: "Error al subir los datos en inventario nacional",
    });
  }
};

module.exports.inventoryExist = async (conn, date) => {
  const { data } = await conn.query(`
      IF exists 
        (SELECT id FROM Qualtia_Planeacion_inv_nacional
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

function agruparDatos(datosCSV) {
  const datosAgrupados = [];
  if (datosCSV.length > 0) {
    const columnas = Object.keys(datosCSV[0]);
    for (let i = 0; i < datosCSV.length; i++) {
      const fila = datosCSV[i];
      const nuevaFila = {};
      columnas.forEach((columna) => {
        nuevaFila[columna] = fila[columna];
      });
      datosAgrupados.push(nuevaFila);
    }
  }
  return datosAgrupados;
}
