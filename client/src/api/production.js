import axios, { CancelToken } from "axios";

export const fetchProductionApi = {
  cancel: null,
  run: (date) =>
    axios
      .get(
        "https://qualtia-kanban-dev.azurewebsites.net/api/production_orders",
        {
          cancelToken: new CancelToken((c) => (fetchProductionApi.cancel = c)),
          params: { fecha: date },
        }
      )
      .then(({ data }) => data),
};

export const insertProductionApi = {
  cancel: null,
  run: (prod) =>
    axios
      .post(
        "https://qualtia-kanban-dev.azurewebsites.net/api/production_orders",
        prod,
        {
          cancelToken: new CancelToken((c) => (insertProductionApi.cancel = c)),
        }
      )
      .then(({ data }) => data),
};

export const updateProductionApi = {
  cancel: null,
  run: (date) =>
    axios
      .get(
        "https://qualtia-kanban-dev.azurewebsites.net/api/production_orders/activateKanban",
        {
          cancelToken: new CancelToken((c) => (updateProductionApi.cancel = c)),
          params: { fecha: date },
        }
      )
      .then(({ data }) => data),
};

export const deleteProductionApi = {
  cancel: null,
  run: (idProd) =>
    axios
      .delete(
        "https://qualtia-kanban-dev.azurewebsites.net/api/production_orders",
        {
          cancelToken: new CancelToken((c) => (deleteProductionApi.cancel = c)),
          params: { idOrdenProduccion: idProd },
        }
      )
      .then(({ data }) => data),
};

export const hideProductionApi = {
  cancel: null,
  run: (idProd) =>
    axios
      .get(
        "https://qualtia-kanban-dev.azurewebsites.net/api/production_orders/hideProductionOrder",
        {
          cancelToken: new CancelToken((c) => (fetchProductionApi.cancel = c)),
          params: { idOrdenProduccion: idProd },
        }
      )
      .then(({ data }) => data),
};

export const updateSequenceApi = {
  cancel: null,
  run: (kanba) =>
    axios
      .put(
        "https://qualtia-kanban-dev.azurewebsites.net/api/production_orders/updateSequence",
        kanba,
        {
          cancelToken: new CancelToken((c) => (updateSequenceApi.cancel = c)),
        }
      )
      .then(({ data }) => data),
};
