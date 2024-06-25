import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";

import {
  tiempoCambio_MVC10,
  tiempoCambio_ULMA2,
} from "../components/Programmer/Sliced/DialogProgramV2/TablaProgramador/data";

export const getTimeParameters = createSelector(
  ({ parameters }) => parameters.data,
  (parameters) => {
    if (_.isEmpty(parameters)) return {};
    const groupByMachine = _.groupBy(parameters, "idEmpacadora");
    const dataProgram = _.map(groupByMachine, (arr) => {
      const cociente = arr[0].idEmpacadora === 1 ? 0.9 : 0.63;
      const tiemposDeRebanado = _.map(arr, (item) => {
        const kgPorMinuto =
          item.ciclos_minutos * item.kg_paquete * item.paquetes_avance;
        return {
          SKU: item.sku,
          KgPorHora: Math.round((kgPorMinuto * 60 * cociente).toFixed(2)),
        };
      });
      return {
        nombre: arr[0].idEmpacadora === 1 ? "MVC 10" : "ULMA 2",
        tiemposDeRebanado,
        tiempoCambio:
          arr[0].idEmpacadora === 1 ? tiempoCambio_MVC10 : tiempoCambio_ULMA2,
      };
    });
    return dataProgram;
  }
);

export const getParameters = createSelector(
  ({ parameters }) => parameters.data,
  (parameters) => {
    if (_.isEmpty(parameters)) return [];
    const groupByMachine = _.groupBy(parameters, "idEmpacadora");
    return groupByMachine;
  }
);
