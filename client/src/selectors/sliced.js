import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";
import moment from "moment-timezone";

export const getHistory = createSelector(
  (state, machine) => machine,
  ({ sliced }) => sliced.data,
  ({ requirement }) => requirement.data,
  (machine, sliced, requirement) => {
    if (_.isEmpty(sliced)) return {};
    const data = transformedData(sliced?.pedidos);
    const arrReq = Object.values(requirement);
    const history = Object.values(
      arrReq.reduce((acc, { producto, plan_ajustado }) => {
        const skuData = {
          sku: producto,
          plan: plan_ajustado || 0,
          lunes: null,
          martes: null,
          miercoles: null,
          jueves: null,
          viernes: null,
          sabado: null,
          total: 0,
          dif: 0,
        };
        const slicedData = data.find((item) => item.sku === producto);
        if (slicedData) {
          const { pedido, mvc10, ulma2, fecha } = slicedData;
          const dayOfWeek = moment(fecha).utc().format("dddd");
          switch (dayOfWeek) {
            case "Lunes":
              skuData.lunes =
                machine === "all"
                  ? pedido
                  : machine === "MVC 10"
                  ? mvc10
                  : ulma2;
              break;
            case "Martes":
              skuData.martes =
                machine === "all"
                  ? pedido
                  : machine === "MVC 10"
                  ? mvc10
                  : ulma2;
              break;
            case "Miercoles":
              skuData.miercoles =
                machine === "all"
                  ? pedido
                  : machine === "MVC 10"
                  ? mvc10
                  : ulma2;
              break;
            case "Jueves":
              skuData.jueves =
                machine === "all"
                  ? pedido
                  : machine === "MVC 10"
                  ? mvc10
                  : ulma2;
              break;
            case "Viernes":
              skuData.viernes =
                machine === "all"
                  ? pedido
                  : machine === "MVC 10"
                  ? mvc10
                  : ulma2;
              break;
            case "Sabado":
              skuData.sabado =
                machine === "all"
                  ? pedido
                  : machine === "MVC 10"
                  ? mvc10
                  : ulma2;
              break;
          }
          const rule =
            machine === "all" ? pedido : machine === "MVC 10" ? mvc10 : ulma2;
          skuData.total += rule;
          skuData.dif = skuData.plan === 0 ? 0 : skuData.plan - skuData.total;
        }
        acc[producto] = skuData;
        return acc;
      }, {})
    );
    const orderByDate = _.orderBy(data, "fecha", "asc");
    const slicedByDate = _.groupBy(orderByDate, "fecha");
    return {
      history,
      slicedByDate,
    };
  }
);

const transformedData = (sliced) => {
  return _.map(sliced, (pedido) => {
    let mvc10 = null;
    let ulma2 = null;
    if (pedido.dividir === true) {
      mvc10 =
        pedido.destino === "MVC 10"
          ? pedido.ajuste_carga
          : pedido.ajuste_carga_extra;
      ulma2 =
        pedido.destino === "ULMA 2"
          ? pedido.ajuste_carga
          : pedido.ajuste_carga_extra;
    } else {
      mvc10 = pedido.destino === "MVC 10" ? pedido.pedido : null;
      ulma2 = pedido.destino === "ULMA 2" ? pedido.pedido : null;
    }
    return {
      sku: pedido.producto,
      fecha: moment(pedido.fecha).utc().format("YYYY-MM-DD"),
      pedido: pedido.pedido,
      mvc10,
      ulma2,
    };
  });
};
