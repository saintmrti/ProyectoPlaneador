import axios, { CancelToken } from "axios";

export const fetchProjectsApi = {
  cancel: null,
  run: () =>
    axios
      .get("/api/proyectos", {
        cancelToken: new CancelToken((c) => (fetchProjectsApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const insertProjectApi = {
  cancel: null,
  run: (data) =>
    axios
      .post("/api/proyectos", data, {
        cancelToken: new CancelToken((c) => (insertProjectApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const updateProjectApi = {
  cancel: null,
  run: (data) =>
    axios
      .put("/api/proyectos", data, {
        cancelToken: new CancelToken((c) => (updateProjectApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const deleteProjectApi = {
  cancel: null,
  run: (idProyecto) =>
    axios
      .delete("/api/proyectos", {
        params: { idProyecto },
        cancelToken: new CancelToken((c) => (deleteProjectApi.cancel = c)),
      })
      .then(({ data }) => data),
};
