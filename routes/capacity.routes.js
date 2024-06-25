const { Router } = require("express");

const response = require("../helpers/response");
const {
  getSummary,
  insertCapacity,
  updateCapacity,
  deleteCapacity,
} = require("../queries/capacity");

const router = Router();

router.get("/", (req, res) => {
  response(res, false, getSummary);
});

router.post("/", (req, res) => {
  const {
    idMaquina,
    sku,
    descripcion,
    barra,
    kg_lote,
    rack,
    no_rack,
    tipo_emulsion,
    tinas_congelado,
    tinas_fresco,
    tinas_emulsion,
    acomodo_barras_cama,
    no_racks_carga,
    kg_barra,
    rendimiento,
    mezclado,
    embutido,
    cocimiento,
    enfriamiento,
    atemperado,
    rebanado,
    entrega,
    ingredientes_secos,
    salmuerizador,
    emulsiones,
    corte_deshuese_fresco,
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
  } = req.body;
  const newSku = {
    idMaquina,
    sku,
    descripcion,
    barra,
    kg_lote: kg_barra ? parseInt(kg_lote) : null,
    rack: rack ? `'${rack}'` : null,
    no_rack: no_rack ? parseFloat(no_rack) : null,
    tipo_emulsion: tipo_emulsion ? `'${tipo_emulsion}'` : null,
    tinas_emulsion: tinas_emulsion ? parseInt(tinas_emulsion) : null,
    tinas_fresco: tinas_fresco ? parseInt(tinas_fresco) : null,
    tinas_congelado: tinas_congelado ? parseInt(tinas_congelado) : null,
    acomodo_barras_cama: acomodo_barras_cama
      ? parseInt(acomodo_barras_cama)
      : null,
    no_racks_carga: no_racks_carga
      ? parseFloat(parseFloat(no_racks_carga).toFixed(2))
      : null,
    kg_barra: kg_barra ? parseFloat(parseFloat(kg_barra).toFixed(2)) : null,
    rendimiento: rendimiento ? parseInt(rendimiento) : null,
    ingredientes_secos:
      ingredientes_secos === "" ? null : parseInt(ingredientes_secos),
    salmuerizador: salmuerizador === "" ? null : parseInt(salmuerizador),
    emulsiones: emulsiones === "" ? null : parseInt(emulsiones),
    corte_deshuese_fresco:
      corte_deshuese_fresco === "" ? null : parseInt(corte_deshuese_fresco),
    mezclado: mezclado === "" ? null : parseInt(mezclado),
    embutido: embutido === "" ? null : parseInt(embutido),
    cocimiento: cocimiento === "" ? null : parseInt(cocimiento),
    enfriamiento: enfriamiento === "" ? null : parseInt(enfriamiento),
    atemperado: atemperado === "" ? null : parseInt(atemperado),
    rebanado: rebanado === "" ? null : parseInt(rebanado),
    entrega: entrega === "" ? null : parseInt(entrega),
    te_ingredientes_salmuera:
      te_ingredientes_salmuera === ""
        ? null
        : parseInt(te_ingredientes_salmuera),
    te_salmuera_mezclado:
      te_salmuera_mezclado === "" ? null : parseInt(te_salmuera_mezclado),
    te_emulsiones_mezclado:
      te_emulsiones_mezclado === "" ? null : parseInt(te_emulsiones_mezclado),
    te_cyd_emulsiones:
      te_cyd_emulsiones === "" ? null : parseInt(te_cyd_emulsiones),
    te_cyd_mezclado: te_cyd_mezclado === "" ? null : parseInt(te_cyd_mezclado),
    te_mezclado_embutido:
      te_mezclado_embutido === "" ? null : parseInt(te_mezclado_embutido),
    te_embutido_cocimiento:
      te_embutido_cocimiento === "" ? null : parseInt(te_embutido_cocimiento),
    te_cocimiento_enfriamiento:
      te_cocimiento_enfriamiento === ""
        ? null
        : parseInt(te_cocimiento_enfriamiento),
    te_enfriamiento_desmolde:
      te_enfriamiento_desmolde === ""
        ? null
        : parseInt(te_enfriamiento_desmolde),
    te_desmolde_atemperado:
      te_desmolde_atemperado === "" ? null : parseInt(te_desmolde_atemperado),
    te_atemperado_rebanado:
      te_atemperado_rebanado === "" ? null : parseInt(te_atemperado_rebanado),
    te_rebanado_entrega:
      te_rebanado_entrega === "" ? null : parseInt(te_rebanado_entrega),
  };
  response(res, false, insertCapacity, newSku);
});

router.put("/", (req, res) => {
  const {
    idSku,
    updatedSliced,
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
    mezclado,
    embutido,
    cocimiento,
    enfriamiento,
    atemperado,
    rebanado,
    entrega,
    ingredientes_secos,
    salmuerizador,
    emulsiones,
    corte_deshuese_fresco,
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
  } = req.body;
  const newSku = {
    idSku,
    updatedSliced,
    sku,
    descripcion,
    barra,
    kg_lote: kg_lote ? parseInt(kg_lote) : null,
    rack: rack ? `'${rack}'` : null,
    no_rack: no_rack ? parseFloat(no_rack) : null,
    tipo_emulsion: tipo_emulsion ? `'${tipo_emulsion}'` : null,
    tinas_emulsion: tinas_emulsion ? parseInt(tinas_emulsion) : null,
    tinas_fresco: tinas_fresco ? parseInt(tinas_fresco) : null,
    tinas_congelado: tinas_congelado ? parseInt(tinas_congelado) : null,
    acomodo_barras_cama: acomodo_barras_cama
      ? parseInt(acomodo_barras_cama)
      : null,
    no_racks_carga: no_racks_carga
      ? parseFloat(parseFloat(no_racks_carga).toFixed(2))
      : null,
    kg_barra: kg_barra ? parseFloat(parseFloat(kg_barra).toFixed(2)) : null,
    rendimiento: rendimiento ? parseInt(rendimiento) : null,
    ingredientes_secos:
      ingredientes_secos === null || ingredientes_secos === ""
        ? null
        : parseInt(ingredientes_secos),
    salmuerizador:
      salmuerizador === null || salmuerizador === ""
        ? null
        : parseInt(salmuerizador),
    emulsiones:
      emulsiones === null || emulsiones === "" ? null : parseInt(emulsiones),
    corte_deshuese_fresco:
      corte_deshuese_fresco === null || corte_deshuese_fresco === ""
        ? null
        : parseInt(corte_deshuese_fresco),
    mezclado: mezclado === null || mezclado === "" ? null : parseInt(mezclado),
    embutido: embutido === null || embutido === "" ? null : parseInt(embutido),
    cocimiento:
      cocimiento === null || cocimiento === "" ? null : parseInt(cocimiento),
    enfriamiento:
      enfriamiento === null || enfriamiento === ""
        ? null
        : parseInt(enfriamiento),
    atemperado:
      atemperado === null || atemperado === "" ? null : parseInt(atemperado),
    rebanado: rebanado === null || rebanado === "" ? null : parseInt(rebanado),
    entrega: entrega === null || entrega === "" ? null : parseInt(entrega),
    te_ingredientes_salmuera:
      te_ingredientes_salmuera === null || te_ingredientes_salmuera === ""
        ? null
        : parseInt(te_ingredientes_salmuera),
    te_salmuera_mezclado:
      te_salmuera_mezclado === null || te_salmuera_mezclado === ""
        ? null
        : parseInt(te_salmuera_mezclado),
    te_emulsiones_mezclado:
      te_emulsiones_mezclado === null || te_emulsiones_mezclado === ""
        ? null
        : parseInt(te_emulsiones_mezclado),
    te_cyd_emulsiones:
      te_cyd_emulsiones === null || te_cyd_emulsiones === ""
        ? null
        : parseInt(te_cyd_emulsiones),
    te_cyd_mezclado:
      te_cyd_mezclado === null || te_cyd_mezclado === ""
        ? null
        : parseInt(te_cyd_mezclado),
    te_mezclado_embutido:
      te_mezclado_embutido === null || te_mezclado_embutido === ""
        ? null
        : parseInt(te_mezclado_embutido),
    te_embutido_cocimiento:
      te_embutido_cocimiento === null || te_embutido_cocimiento === ""
        ? null
        : parseInt(te_embutido_cocimiento),
    te_cocimiento_enfriamiento:
      te_cocimiento_enfriamiento === null || te_cocimiento_enfriamiento === ""
        ? null
        : parseInt(te_cocimiento_enfriamiento),
    te_enfriamiento_desmolde:
      te_enfriamiento_desmolde === null || te_enfriamiento_desmolde === ""
        ? null
        : parseInt(te_enfriamiento_desmolde),
    te_desmolde_atemperado:
      te_desmolde_atemperado === null || te_desmolde_atemperado === ""
        ? null
        : parseInt(te_desmolde_atemperado),
    te_atemperado_rebanado:
      te_atemperado_rebanado === null || te_atemperado_rebanado === ""
        ? null
        : parseInt(te_atemperado_rebanado),
    te_rebanado_entrega:
      te_rebanado_entrega === null || te_rebanado_entrega === ""
        ? null
        : parseInt(te_rebanado_entrega),
  };
  response(res, false, updateCapacity, newSku);
});

router.delete("/", (req, res) => {
  const { idSku } = req.query;
  const sku = {
    idSku: parseInt(idSku),
  };
  response(res, false, deleteCapacity, sku);
});

module.exports = router;
