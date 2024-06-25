import TextField from "@mui/material/TextField";

export const SlicedFields = ({ register }) => {
  return (
    <>
      <TextField
        label="Acomodo Barras Cama"
        autoComplete="off"
        type="number"
        size="small"
        {...register("acomodo_barras_cama", { required: false })}
      />
      <TextField
        label="No. Racks Carga"
        autoComplete="off"
        type="number"
        size="small"
        inputProps={{ step: "0.01" }}
        {...register("no_racks_carga", { required: false })}
      />
      <TextField
        label="Kg Barra"
        autoComplete="off"
        type="number"
        size="small"
        inputProps={{ step: "0.01" }}
        {...register("kg_barra", { required: false })}
      />
      <TextField
        label="Rendimiento"
        autoComplete="off"
        type="number"
        size="small"
        inputProps={{ step: "0.01" }}
        {...register("rendimiento", { required: false })}
      />
    </>
  );
};
