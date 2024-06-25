import axios, { CancelToken } from "axios";

export const fetchProductsApi = {
  cancel: null,
  run: () =>
    axios
      .get("/api/productos", {
        cancelToken: new CancelToken((c) => (fetchProductsApi.cancel = c)),
      })
      .then(({ data }) => data),
};

// export const insertProductsApi = {
//   cancel: null,
//   run: (data) =>
//     axios
//       .post("/api/capacidad", data, {
//         cancelToken: new CancelToken((c) => (insertProductsApi.cancel = c)),
//       })
//       .then(({ data }) => data),
// };

export const updateProductsApi = {
  cancel: null,
  run: (data) =>
    axios
      .put("/api/productos", data, {
        cancelToken: new CancelToken((c) => (updateProductsApi.cancel = c)),
      })
      .then(({ data }) => data),
};

// export const deleteProductsApi = {
//   cancel: null,
//   run: (idSku) =>
//     axios
//       .delete("/api/capacidad", {
//         params: { idSku },
//         cancelToken: new CancelToken((c) => (deleteProductsApi.cancel = c)),
//       })
//       .then(({ data }) => data),
// };
