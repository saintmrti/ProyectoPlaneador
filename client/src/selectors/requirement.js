import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";

import { getSlicedCapacity } from "./capacity";
import { getTimeParameters } from "./parameters";
import { calculatePedido } from "../components/Programmer/Sliced/calculateSliced";

const requirement = ({ requirement }) => requirement.data;
const sliced = ({ sliced }) => sliced.data;

export const getRequirement = createSelector(
  [requirement, sliced, getSlicedCapacity, getTimeParameters],
  (requirement, sliced, slicedCapacity, parameters) => {
    if (_.isEmpty(requirement)) return {};
    const ordersPlan = [];
    const slicedCapacityIndex = _.keyBy(slicedCapacity, "sku");
    const dataMVC10 = _.find(parameters, {
      nombre: "MVC 10",
    })?.tiemposDeRebanado;
    const list = _.map(requirement, (item) => {
      const inv_final_1 =
        item.bpt_cedis + item.wip_programa_hoy - item.salida_hoy;
      const inv_final_2 = inv_final_1 - item.prox_salida;
      const programar =
        inv_final_2 < 0
          ? item.tiendita + -inv_final_2
          : item.tiendita - inv_final_2;
      // RECUERDA QUE ESTE CODIGO ESTA EN PRUEBA
      let destino = "";
      let pedido = 0;
      let ajuste_carga = 0;
      if (_.isEmpty(sliced?.pedido)) {
        const dif_inv_final = calculateDifInvFinal(
          inv_final_1,
          item.prox_salida,
          item.tiendita,
          0
        );
        const skuMVC10 = _.find(dataMVC10, { SKU: item.producto });
        if (dif_inv_final < 0 && item.linea === "Rebanados" && skuMVC10) {
          const skuCapacity = slicedCapacityIndex[item.producto];
          const { load, order } = addAutoCharge(dif_inv_final, skuCapacity);
          const newOrder = {
            sku: item.producto,
            ajuste_carga: load,
            idProducto: item.idProducto,
            pedido: order,
            destino: "MVC 10",
            destino_doble: "",
            ajuste_carga_extra: 0,
            dividir: false,
          };
          ordersPlan.push(newOrder);
          ajuste_carga = load;
          pedido = order;
          destino = "MVC 10";
        }
      }
      // AQUI TERMINA EL CODIGO DE PRUEBA
      return {
        ...item,
        inv_final_1,
        inv_final_2,
        programar,
        pedido,
        ajuste_carga,
        destino,
      };
    });
    return {
      requirements: list,
      ordersPlan,
    };
  }
);

const calculateInvFinal3 = (inv_final_1, prox_salida, pedido) => {
  const invFinal1 = inv_final_1 || 0;
  const proxSalida = prox_salida || 0;
  const pedidoValue = pedido || 0;
  return invFinal1 + pedidoValue - proxSalida;
};

const calculateDifInvFinal = (inv_final_1, prox_salida, tiendita, pedido) => {
  const tienda = tiendita || 0;
  const invFinal3 = calculateInvFinal3(inv_final_1, prox_salida, pedido);
  return invFinal3 - tienda;
};

// const addAutoCharge = (diff, sku) => {
//   let load = 0;
//   let order = 0;
//   let difference = Math.abs(diff);
//   while (order <= difference) {
//     load++;
//     order = calculatePedido(load, sku);
//   }
//   return {
//     load,
//     order,
//   };
// };

const addAutoCharge = (diff, sku) => {
  let load = 0;
  let order = 0;
  let difference = Math.abs(diff);
  if (sku) {
    const { acomodo_barras_cama, kg_barra } = sku;
    const no_barras = acomodo_barras_cama * 9;
    const kg_parrilla = kg_barra * no_barras;
    const kg_parrilla_rend = kg_parrilla * 0.89;
    load = Math.ceil(difference / (kg_parrilla_rend || 1));
    order = calculatePedido(load, sku);
    while (order <= difference) {
      load++;
      order = calculatePedido(load, sku);
    }
  }
  return {
    load,
    order,
  };
};
