import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";
import moment from "moment";

export const getProduction = createSelector(
  ({ production }) => production.data,
  (production) => {
    if (_.isEmpty(production)) return [];
    const arrProd = _.orderBy(production, ["secuencia"], ["asc"]);
    // const arrProd = Object.values(production);
    const data = _.map(arrProd, (prod, index) => ({
      id: prod.idOrdenProduccion,
      sec: index + 1,
      producto: prod.idSku,
      destino: prod.destino,
      rack: prod.rack,
      kg_lote: prod.kg_lote,
      no_rack: prod.no_rack,
      tipo_emulsion: prod.tipo_emulsion,
      iniciada: prod.iniciada,
      kanban: prod.kanban,
      activo: prod.activo,
      procesos: [
        // {
        //   nombre: "Ingredientes Secos",
        //   inicio: prod.f_inicio_ingredientes_secos
        //     ? moment(prod.f_inicio_ingredientes_secos).format("HH:mm")
        //     : null,
        //   fin: prod.f_fin_ingredientes_secos
        //     ? moment(prod.f_fin_ingredientes_secos).format("HH:mm")
        //     : null,
        // },
        // {
        //   nombre: "Salmuerizador",
        //   inicio: prod.f_inicio_salmueras
        //     ? moment(prod.f_inicio_salmueras).format("HH:mm")
        //     : null,
        //   fin: prod.f_fin_salmueras
        //     ? moment(prod.f_fin_salmueras).format("HH:mm")
        //     : null,
        // },
        // {
        //   nombre: "Emulsiones",
        //   inicio: prod.f_inicio_emulsiones
        //     ? moment(prod.f_inicio_emulsiones).format("HH:mm")
        //     : null,
        //   fin: prod.f_fin_emulsiones
        //     ? moment(prod.f_fin_emulsiones).format("HH:mm")
        //     : null,
        // },
        // {
        //   nombre: "CyD Frescos",
        //   inicio: prod.f_inicio_corte_deshuese_frescos
        //     ? moment(prod.f_inicio_corte_deshuese_frescos).format("HH:mm")
        //     : null,
        //   fin: prod.f_fin_corte_deshuese_frescos
        //     ? moment(prod.f_fin_corte_deshuese_frescos).format("HH:mm")
        //     : null,
        // },
        // {
        //   nombre: "CyD Congelados",
        //   inicio: prod.f_inicio_corte_deshuese_congelados
        //     ? moment(prod.f_inicio_corte_deshuese_congelados).format("HH:mm")
        //     : null,
        //   fin: prod.f_fin_corte_deshuese_congelados
        //     ? moment(prod.f_fin_corte_deshuese_congelados).format("HH:mm")
        //     : null,
        // },
        {
          nombre: "Mezclado",
          inicio: prod.f_inicio_mezcladora
            ? moment(prod.f_inicio_mezcladora).format("HH:mm")
            : null,
          fin: prod.f_fin_mezcladora
            ? moment(prod.f_fin_mezcladora).format("HH:mm")
            : null,
        },
        {
          nombre: "Embutido",
          inicio: prod.f_inicio_embutidos
            ? moment(prod.f_inicio_embutidos).format("HH:mm")
            : null,
          fin: prod.f_fin_embutidos
            ? moment(prod.f_fin_embutidos).format("HH:mm")
            : null,
        },
        {
          nombre: "Cocimiento",
          inicio: prod.f_inicio_cocimiento
            ? moment(prod.f_inicio_cocimiento).format("HH:mm")
            : null,
          fin: prod.f_fin_cocimiento
            ? moment(prod.f_fin_cocimiento).format("HH:mm")
            : null,
        },
        {
          nombre: "Enfriamiento",
          inicio: prod.f_inicio_enfriamiento
            ? moment(prod.f_inicio_enfriamiento).format("HH:mm")
            : null,
          fin: prod.f_fin_enfriamiento
            ? moment(prod.f_fin_enfriamiento).format("HH:mm")
            : null,
        },
        {
          nombre: "Desmolde",
          inicio: prod.f_inicio_desmolde
            ? moment(prod.f_inicio_desmolde).format("HH:mm")
            : null,
          fin: prod.f_fin_desmolde
            ? moment(prod.f_fin_desmolde).format("HH:mm")
            : null,
        },
        {
          nombre: "Atemperado",
          inicio: prod.f_inicio_atemperado
            ? moment(prod.f_inicio_atemperado).format("HH:mm")
            : null,
          fin: prod.f_fin_atemperado
            ? moment(prod.f_fin_atemperado).format("HH:mm")
            : null,
        },
        {
          nombre: "Rebanado",
          inicio: prod.f_inicio_rebanado
            ? moment(prod.f_inicio_rebanado).format("HH:mm")
            : null,
          fin: prod.f_fin_rebanado
            ? moment(prod.f_fin_rebanado).format("HH:mm")
            : null,
        },
        {
          nombre: "Almacen",
          inicio: prod.f_inicio_almacen
            ? moment(prod.f_inicio_almacen).format("HH:mm")
            : null,
          fin: prod.f_fin_almacen
            ? moment(prod.f_fin_almacen).format("HH:mm")
            : null,
        },
      ],
    }));
    return data;
  }
);
