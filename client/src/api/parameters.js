import axios, { CancelToken } from "axios";

export const fetchParametersApi = {
  cancel: null,
  run: () =>
    axios
      .get("/api/parametros", {
        cancelToken: new CancelToken((c) => (fetchParametersApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const insertParametersApi = {
  cancel: null,
  run: (data) =>
    axios
      .post("/api/parametros", data, {
        cancelToken: new CancelToken((c) => (insertParametersApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const updateParametersApi = {
  cancel: null,
  run: (data) =>
    axios
      .put("/api/parametros", data, {
        cancelToken: new CancelToken((c) => (updateParametersApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const deleteParametersApi = {
  cancel: null,
  run: (id) =>
    axios
      .delete("/api/parametros", {
        params: { id },
        cancelToken: new CancelToken((c) => (deleteParametersApi.cancel = c)),
      })
      .then(({ data }) => data),
};
