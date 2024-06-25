import axios, { CancelToken } from "axios";

export const fetchSlicedApi = {
  cancel: null,
  run: (date) =>
    axios
      .get("/api/rebanado", {
        cancelToken: new CancelToken((c) => (fetchSlicedApi.cancel = c)),
        params: { date },
      })
      .then(({ data }) => data),
};

export const insertSlicedApi = {
  cancel: null,
  run: (sliced) =>
    axios
      .post("/api/rebanado", sliced, {
        cancelToken: new CancelToken((c) => (insertSlicedApi.cancel = c)),
      })
      .then(({ data }) => data),
};
