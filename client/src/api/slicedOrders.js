import axios, { CancelToken } from "axios";

export const fetchSlicedOrdersApi = {
  cancel: null,
  run: (date) =>
    axios
      .get("https://qualtia-kanban-dev.azurewebsites.net/api/sliced_orders", {
        cancelToken: new CancelToken((c) => (fetchSlicedOrdersApi.cancel = c)),
        params: { fecha: date },
      })
      .then(({ data }) => data),
};

export const insertSlicedOrdersApi = {
  cancel: null,
  run: (sliced) =>
    axios
      .post(
        "https://qualtia-kanban-dev.azurewebsites.net/api/sliced_orders",
        sliced,
        {
          cancelToken: new CancelToken(
            (c) => (insertSlicedOrdersApi.cancel = c)
          ),
        }
      )
      .then(({ data }) => data),
};

export const updateSlicedOrdersApi = {
  cancel: null,
  run: (date) =>
    axios
      .get(
        "https://qualtia-kanban-dev.azurewebsites.net/api/sliced_orders/activateKanban",
        {
          cancelToken: new CancelToken(
            (c) => (updateSlicedOrdersApi.cancel = c)
          ),
          params: { fecha: date },
        }
      )
      .then(({ data }) => data),
};
