import TextField from "@mui/material/TextField";

export const SlicedTimeFields = ({ register }) => {
  return (
    <>
      <TextField
        label="T.E. a atemperado"
        type="number"
        size="small"
        {...register("te_desmolde_atemperado", { required: false })}
      />
      <TextField
        label="Atemperado"
        type="number"
        size="small"
        {...register("atemperado", { required: false })}
      />
      <TextField
        label="T.E. a rebanado"
        type="number"
        size="small"
        {...register("te_atemperado_rebanado", { required: false })}
      />
      <TextField
        label="Rebanado"
        type="number"
        size="small"
        {...register("rebanado", { required: false })}
      />
      <TextField
        label="T.E. a entrega"
        type="number"
        size="small"
        {...register("te_rebanado_entrega", { required: false })}
      />
      <TextField
        label="Entrega"
        type="number"
        size="small"
        {...register("entrega", { required: false })}
      />
    </>
  );
};
