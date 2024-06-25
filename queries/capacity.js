module.exports.getSummary = async (conn) => {
  const { data } = await conn.query(`
      SELECT c.id, c.idMaquina, m.nombre as maquina, c.sku, c.barra, c.descripcion, c.acomodo_barras_cama, c.no_racks_carga, c.kg_barra, c.rendimiento,
      c.kg_lote, c.rack, c.no_rack, c.tipo_emulsion, c.tinas_emulsion, c.tinas_fresco, c.tinas_congelado, m.idLinea, l.nombre as linea,
      t.ingredientes_secos, t.salmuerizador, t.corte_deshuese_fresco, t.emulsiones, t.mezclado, t.embutido, t.cocimiento, t.enfriamiento, t.desmolde, t.atemperado,
      t.rebanado, t.entrega, t.te_ingredientes_salmuera, t.te_salmuera_mezclado, t.te_emulsiones_mezclado,
      t.te_cyd_emulsiones, t.te_cyd_mezclado, t.te_mezclado_embutido, t.te_embutido_cocimiento, t.te_cocimiento_enfriamiento, 
      t.te_enfriamiento_desmolde, t.te_desmolde_atemperado, t.te_atemperado_rebanado, t.te_rebanado_entrega
      FROM Qualtia_Capacidad_cat_sku as c
      INNER JOIN Qualtia_Capacidad_maquinas as m
      ON c.idMaquina = m.id
      INNER JOIN Qualtia_Capacidad_lineas as l
      ON m.idLinea = l.id
      LEFT JOIN Qualtia_Capacidad_tiempos_sku as t
      ON c.id = t.idProducto;
    `);
  return data;
};

module.exports.insertCapacity = async (
  conn,
  {
    idMaquina,
    sku,
    descripcion,
    barra,
    kg_lote,
    rack,
    no_rack,
    tipo_emulsion,
    tinas_emulsion,
    tinas_fresco,
    tinas_congelado,
    acomodo_barras_cama,
    no_racks_carga,
    kg_barra,
    rendimiento,
    ingredientes_secos,
    salmuerizador,
    emulsiones,
    corte_deshuese_fresco,
    mezclado,
    embutido,
    cocimiento,
    enfriamiento,
    atemperado,
    rebanado,
    entrega,
    te_ingredientes_salmuera,
    te_salmuera_mezclado,
    te_emulsiones_mezclado,
    te_cyd_emulsiones,
    te_cyd_mezclado,
    te_mezclado_embutido,
    te_embutido_cocimiento,
    te_cocimiento_enfriamiento,
    te_enfriamiento_desmolde,
    te_desmolde_atemperado,
    te_atemperado_rebanado,
    te_rebanado_entrega,
  }
) => {
  const {
    info: { insertId },
  } = await conn.query(`
      INSERT INTO Qualtia_Capacidad_cat_sku (idMaquina, sku, barra, descripcion, kg_lote, rack, no_rack, tipo_emulsion, tinas_emulsion, tinas_fresco, tinas_congelado, acomodo_barras_cama, no_racks_carga, kg_barra, rendimiento)
      VALUES (${idMaquina}, '${sku}', '${barra}', '${descripcion}', ${kg_lote}, ${rack}, ${no_rack}, ${tipo_emulsion}, ${tinas_emulsion}, ${tinas_fresco}, ${tinas_congelado}, ${acomodo_barras_cama}, ${no_racks_carga}, ${kg_barra}, ${rendimiento});
    `);

  await conn.query(`
      INSERT INTO Qualtia_Capacidad_tiempos_sku (idProducto, ingredientes_secos, salmuerizador, emulsiones, corte_deshuese_fresco, mezclado, embutido, cocimiento, enfriamiento, atemperado, rebanado, entrega, 
      te_ingredientes_salmuera, te_salmuera_mezclado, te_emulsiones_mezclado, te_cyd_emulsiones, te_cyd_mezclado, te_mezclado_embutido, te_embutido_cocimiento, te_cocimiento_enfriamiento, te_enfriamiento_desmolde, te_desmolde_atemperado, te_atemperado_rebanado, te_rebanado_entrega)
      VALUES (${insertId}, ${ingredientes_secos}, ${salmuerizador}, ${emulsiones}, ${corte_deshuese_fresco}, ${mezclado}, ${embutido}, ${cocimiento}, ${enfriamiento}, ${atemperado}, ${rebanado}, ${entrega},
      ${te_ingredientes_salmuera}, ${te_salmuera_mezclado}, ${te_emulsiones_mezclado}, ${te_cyd_emulsiones}, ${te_cyd_mezclado}, ${te_mezclado_embutido}, ${te_embutido_cocimiento}, ${te_cocimiento_enfriamiento}, ${te_enfriamiento_desmolde}, ${te_desmolde_atemperado}, ${te_atemperado_rebanado}, ${te_rebanado_entrega});
    `);

  const { data } = await conn.query(`
      SELECT c.id, c.idMaquina, m.nombre as maquina, c.sku, c.barra, c.descripcion, c.acomodo_barras_cama, c.no_racks_carga, c.kg_barra, c.rendimiento,
      c.kg_lote, c.rack, c.no_rack, c.tipo_emulsion, c.tinas_emulsion, c.tinas_fresco, c.tinas_congelado, m.idLinea, l.nombre as linea,
      t.ingredientes_secos, t.salmuerizador, t.corte_deshuese_fresco, t.emulsiones, t.mezclado, t.embutido, t.cocimiento, t.enfriamiento, t.desmolde, t.atemperado,
      t.rebanado, t.entrega, t.te_ingredientes_salmuera, t.te_salmuera_mezclado, t.te_emulsiones_mezclado,
      t.te_cyd_emulsiones, t.te_cyd_mezclado, t.te_mezclado_embutido, t.te_embutido_cocimiento, t.te_cocimiento_enfriamiento, 
      t.te_enfriamiento_desmolde, t.te_desmolde_atemperado, t.te_atemperado_rebanado, t.te_rebanado_entrega
      FROM Qualtia_Capacidad_cat_sku as c
      INNER JOIN Qualtia_Capacidad_maquinas as m
      ON c.idMaquina = m.id
      INNER JOIN Qualtia_Capacidad_lineas as l
      ON m.idLinea = l.id
      LEFT JOIN Qualtia_Capacidad_tiempos_sku as t
      ON c.id = t.idProducto
      WHERE c.id = ${insertId};
  `);
  return data[0];
};

module.exports.updateCapacity = async (
  conn,
  {
    idSku,
    updatedSliced,
    sku,
    barra,
    descripcion,
    kg_lote,
    rack,
    no_rack,
    tipo_emulsion,
    tinas_emulsion,
    tinas_fresco,
    tinas_congelado,
    acomodo_barras_cama,
    no_racks_carga,
    kg_barra,
    rendimiento,
    ingredientes_secos,
    salmuerizador,
    emulsiones,
    corte_deshuese_fresco,
    mezclado,
    embutido,
    cocimiento,
    enfriamiento,
    atemperado,
    rebanado,
    entrega,
    te_ingredientes_salmuera,
    te_salmuera_mezclado,
    te_emulsiones_mezclado,
    te_cyd_emulsiones,
    te_cyd_mezclado,
    te_mezclado_embutido,
    te_embutido_cocimiento,
    te_cocimiento_enfriamiento,
    te_enfriamiento_desmolde,
    te_desmolde_atemperado,
    te_atemperado_rebanado,
    te_rebanado_entrega,
  }
) => {
  await conn.query(`
      UPDATE Qualtia_Capacidad_cat_sku
      SET sku = '${sku}', 
      ${
        !updatedSliced
          ? `
          descripcion = '${descripcion}',
          barra = '${barra}',
          kg_lote = ${kg_lote},
          rack = ${rack},
          no_rack = ${no_rack},
          tipo_emulsion = ${tipo_emulsion},
          tinas_emulsion = ${tinas_emulsion},
          tinas_fresco = ${tinas_fresco},
          tinas_congelado = ${tinas_congelado}
        `
          : `
          acomodo_barras_cama = ${acomodo_barras_cama},
          no_racks_carga = ${no_racks_carga},
          kg_barra = ${kg_barra},
          rendimiento = ${rendimiento}
        `
      }
      WHERE id = ${idSku};
    `);
  await conn.query(`
      UPDATE Qualtia_Capacidad_tiempos_sku
      ${
        !updatedSliced
          ? `
            SET ingredientes_secos = ${ingredientes_secos},
            te_ingredientes_salmuera = ${te_ingredientes_salmuera},
            salmuerizador = ${salmuerizador},
            te_salmuera_mezclado = ${te_salmuera_mezclado},
            emulsiones = ${emulsiones},
            te_emulsiones_mezclado = ${te_emulsiones_mezclado},
            corte_deshuese_fresco = ${corte_deshuese_fresco},
            te_cyd_emulsiones = ${te_cyd_emulsiones},
            te_cyd_mezclado = ${te_cyd_mezclado},
            mezclado = ${mezclado},
            te_mezclado_embutido = ${te_mezclado_embutido},
            embutido = ${embutido},
            te_embutido_cocimiento = ${te_embutido_cocimiento},
            cocimiento = ${cocimiento},
            te_cocimiento_enfriamiento = ${te_cocimiento_enfriamiento},
            enfriamiento = ${enfriamiento},
            te_enfriamiento_desmolde = ${te_enfriamiento_desmolde}
        `
          : `
            SET te_desmolde_atemperado = ${te_desmolde_atemperado},
            atemperado = ${atemperado},
            te_atemperado_rebanado = ${te_atemperado_rebanado},
            rebanado = ${rebanado},
            te_rebanado_entrega = ${te_rebanado_entrega},
            entrega = ${entrega}
        `
      }
      WHERE idProducto = ${idSku};
    `);

  const { data } = await conn.query(`
      SELECT c.id, c.idMaquina, m.nombre as maquina, c.sku, c.barra, c.descripcion, c.acomodo_barras_cama, c.no_racks_carga, c.kg_barra, c.rendimiento,
      c.kg_lote, c.rack, c.no_rack, c.tipo_emulsion, c.tinas_emulsion, c.tinas_fresco, c.tinas_congelado, m.idLinea, l.nombre as linea,
      t.ingredientes_secos, t.salmuerizador, t.corte_deshuese_fresco, t.emulsiones, t.mezclado, t.embutido, t.cocimiento, t.enfriamiento, t.desmolde, t.atemperado,
      t.rebanado, t.entrega, t.te_ingredientes_salmuera, t.te_salmuera_mezclado, t.te_emulsiones_mezclado,
      t.te_cyd_emulsiones, t.te_cyd_mezclado, t.te_mezclado_embutido, t.te_embutido_cocimiento, t.te_cocimiento_enfriamiento, 
      t.te_enfriamiento_desmolde, t.te_desmolde_atemperado, t.te_atemperado_rebanado, t.te_rebanado_entrega
      FROM Qualtia_Capacidad_cat_sku as c
      INNER JOIN Qualtia_Capacidad_maquinas as m
      ON c.idMaquina = m.id
      INNER JOIN Qualtia_Capacidad_lineas as l
      ON m.idLinea = l.id
      LEFT JOIN Qualtia_Capacidad_tiempos_sku as t
      ON c.id = t.idProducto
      WHERE c.id = ${idSku};
    `);
  return data[0];
};

module.exports.deleteCapacity = async (conn, { idSku }) => {
  await conn.query(`
      DELETE FROM Qualtia_Capacidad_rebanados
      WHERE id = ${idSku};
    `);
  await conn.query(`
      DELETE FROM Qualtia_Capacidad_tiempos_sku
      WHERE idProducto = ${idSku};
    `);
  await conn.query(`
      DELETE FROM Qualtia_Capacidad_cat_sku
      WHERE id = ${idSku};
    `);
  return idSku;
};
