const _ = require("lodash");
const moment = require("moment-timezone");
const { getSummary } = require("../queries/documents");

module.exports.transfered = async (cn, date) => {
  try {
    const { productos, inv_nacional, requirement, wip_programa, pr, sem } =
      await getSummary(cn, date);

    const newReq = _.map(requirement, (req) => ({
      ...req,
      real_date: moment(req.fecha).utc().format("YYYY-MM-DD"),
    }));

    const gropedReq = _.groupBy(newReq, "real_date");
    const newRegisters = _.map(productos, (producto) => {
      const bpt = _.find(
        inv_nacional,
        (i) =>
          i.bpt &&
          i.bpt.toUpperCase() === `PTAMTY${producto.producto}`.toUpperCase()
      );
      const cedis = _.find(
        inv_nacional,
        (i) =>
          i.cedis &&
          i.cedis.toUpperCase() === `CEDMTY${producto.producto}`.toUpperCase()
      );
      const req_yesterday = _.find(
        gropedReq[moment(date).subtract(1, "days").format("YYYY-MM-DD")],
        (i) =>
          i.producto &&
          i.producto.toUpperCase() === producto.producto.toUpperCase()
      );
      const req_today = _.find(
        gropedReq[date],
        (i) =>
          i.producto &&
          i.producto.toUpperCase() === producto.producto.toUpperCase()
      );
      const wip = _.find(
        wip_programa,
        (i) =>
          i.producto &&
          i.producto.toUpperCase() === producto.producto.toUpperCase()
      );
      const plan_rebanado = _.find(
        pr,
        (i) => i.idProducto && i.idProducto === producto.id
      );
      const kg_carga = producto.min_kg_carga;
      const weeks = _.find(
        sem,
        (i) =>
          i.producto &&
          i.producto.toUpperCase() === producto.producto.toUpperCase()
      );

      const inv_bpt = bpt ? bpt?.inv_net_trans : 0;
      const inv_cedis = cedis ? cedis?.inv_net_trans : 0;
      const tiendita = req_today ? req_today?.bptmy_maximo : 0;
      const programa_hoy = plan_rebanado ? plan_rebanado?.pedido : 0;
      const prox_salida = Math.round(req_today ? req_today?.total : 0);
      const salida_hoy = Math.round(req_yesterday ? req_yesterday?.total : 0);
      const wip_hoy = wip ? parseInt(wip?.total_Kilos) : 0;
      const min_kg_carga = kg_carga ? kg_carga : 1;
      const plan_ajustado = weeks ? weeks?.plan_ajustado : 0;

      return {
        ...producto,
        inv_bpt,
        inv_cedis,
        bpt_cedis: inv_bpt + inv_cedis,
        tiendita,
        prox_salida,
        min_kg_carga,
        salida_hoy,
        wip_hoy,
        programa_hoy,
        wip_programa_hoy: wip_hoy + programa_hoy,
        plan_ajustado,
      };
    });
    return newRegisters;
  } catch (error) {
    console.error(error);
    if (cn) cn.close();
    res.json(errorObj(error));
  }
};
