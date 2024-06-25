import { createSelector } from "@reduxjs/toolkit";
// import moment from "moment-timezone";
import _ from "lodash";

export const getCapacity = createSelector(
  ({ capacity }) => capacity.data,
  (capacity) => {
    if (_.isEmpty(capacity)) return {};
    const capacityData = _.map(capacity, (item) => ({
      ...item,
      procesos: [
        {
          nombre: "Ingredientes Secos",
          data: item.ingredientes_secos ? item.ingredientes_secos : null,
        },
        {
          nombre: "Salmuerizador",
          data: item.salmuerizador ? item.salmuerizador : null,
        },
        {
          nombre: "Corte y Deshuese",
          data: item.corte_deshuese_fresco ? item.corte_deshuese_fresco : null,
        },
        {
          nombre: "Emulsiones",
          data: item.emulsiones ? item.emulsiones : null,
        },
        {
          nombre: "Mezclado",
          data: item.mezclado ? item.mezclado : null,
        },
        {
          nombre: "Embutido",
          data: item.embutido ? item.embutido : null,
        },
        {
          nombre: "Cocimiento",
          data: item.cocimiento ? item.cocimiento : null,
        },
        {
          nombre: "Enfriamiento",
          data: item.enfriamiento ? item.enfriamiento : null,
        },
        {
          nombre: "Desmolde",
          data: item.desmolde ? item.desmolde : null,
        },
        {
          nombre: "Atemperado",
          data: item.atemperado ? item.atemperado : null,
        },
        {
          nombre: "Rebanado",
          data: item.rebanado ? item.rebanado : null,
        },
        {
          nombre: "Entrega",
          data: item.entrega ? item.entrega : null,
        },
      ],
    }));

    const groupByLinea = _.groupBy(capacityData, "idLinea");

    // if (groupByLinea[2]) {
    //   groupByLinea[2] = _.filter(groupByLinea[2], (item) => {
    //     return item.barra != null && item.sku === item.barra;
    //   });
    // }

    const list = _.mapValues(groupByLinea, (itemsInLinea) => {
      return _.groupBy(itemsInLinea, "idMaquina");
    });

    return list;
  }
);

export const getSlicedCapacity = createSelector(
  ({ capacity }) => capacity.data,
  (capacity) => {
    if (_.isEmpty(capacity)) return [];
    const list = _.map(capacity, (item) => {
      return {
        id: item.id,
        sku: item.sku,
        descripcion: item.descripcion,
        acomodo_barras_cama: item.acomodo_barras_cama,
        no_racks_carga: item.no_racks_carga,
        kg_barra: item.kg_barra,
        rendimiento: item.rendimiento,
        idMaquina: item.idMaquina,
      };
    });
    const filterList = _.filter(list, (item) => {
      return item.idMaquina === 6 && item.descripcion === "Jamones Rebanados";
    });
    return _.keyBy(filterList, "id");
  }
);

export const getLines = createSelector(
  ({ capacity }) => capacity.data,
  (capacity) => {
    if (_.isEmpty(capacity)) return [];
    const list = _.values(capacity, "idLinea");
    const lines = _.uniqBy(list, "idLinea");
    return lines;
  }
);

export const getMachines = createSelector(
  ({ capacity }) => capacity.data,
  (capacity) => {
    if (_.isEmpty(capacity)) return [];
    const machines = _.values(capacity, "idMaquina");
    const list = _.uniqBy(machines, "idMaquina");
    return list;
  }
);

export const getListSku = createSelector(
  ({ capacity }) => capacity.data,
  (capacity) => {
    if (_.isEmpty(capacity)) return [];
    const list = _.map(capacity, (item) => {
      return {
        ...item,
        label: item.sku,
      };
    });
    const filterList = _.filter(list, (item) => {
      return item.idMaquina === 6;
    });
    return filterList;
  }
);

export const getSku = createSelector(
  ({ capacity }, idSku) => capacity.data[idSku],
  (product) => {
    if (!product) return {};
    return product;
  }
);
