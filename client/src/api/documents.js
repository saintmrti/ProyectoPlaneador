import axios, { CancelToken } from "axios";

export const invDocumentsApi = {
  cancel: null,
  run: (inv) =>
    axios
      .post("/api/documentos/inventario", inv, {
        headers: { "Content-Type": "multipart/form-data" },
        cancelToken: new CancelToken((c) => (invDocumentsApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const reqDocumentsApi = {
  cancel: null,
  run: (req) =>
    axios
      .post("/api/documentos/requerimiento", req, {
        headers: { "Content-Type": "multipart/form-data" },
        cancelToken: new CancelToken((c) => (reqDocumentsApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const wipDocumentsApi = {
  cancel: null,
  run: (wip) =>
    axios
      .post("/api/documentos/wip", wip, {
        headers: { "Content-Type": "multipart/form-data" },
        cancelToken: new CancelToken((c) => (wipDocumentsApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const weekDocumentsApi = {
  cancel: null,
  run: (week) =>
    axios
      .post("/api/documentos/semanas", week, {
        headers: { "Content-Type": "multipart/form-data" },
        cancelToken: new CancelToken((c) => (weekDocumentsApi.cancel = c)),
      })
      .then(({ data }) => data),
};
