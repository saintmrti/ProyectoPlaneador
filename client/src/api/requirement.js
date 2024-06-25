import axios, { CancelToken } from "axios";

export const fetchRequirementApi = {
  cancel: null,
  run: (date) =>
    axios
      .get("/api/requerimiento", {
        cancelToken: new CancelToken((c) => (fetchRequirementApi.cancel = c)),
        params: { date },
      })
      .then(({ data }) => data),
};

export const insertRequirementApi = {
  cancel: null,
  run: (req) =>
    axios
      .post("/api/requerimiento", req, {
        cancelToken: new CancelToken((c) => (insertRequirementApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const deleteRequirementApi = {
  cancel: null,
  run: (date) =>
    axios
      .delete("/api/requerimiento", {
        params: { date },
        cancelToken: new CancelToken((c) => (deleteRequirementApi.cancel = c)),
      })
      .then(({ data }) => data),
};
