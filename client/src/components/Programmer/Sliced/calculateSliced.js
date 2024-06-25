export const calculatePedido = (load, sku) => {
  if (sku && load !== "" && load !== 0) {
    const { acomodo_barras_cama, kg_barra } = sku;
    const no_barras = acomodo_barras_cama * 9;
    const kg_parrilla = kg_barra * no_barras;
    const kg_parrilla_rend = kg_parrilla * 0.89;
    const result = kg_parrilla_rend * load;
    return Math.round(result);
  } else {
    return 0;
  }
};
