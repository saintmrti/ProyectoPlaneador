import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Icon from "@mui/material/Icon";

import { IconContainer } from "./styled";

import {
  insertProjectRequest,
  updateProjectRequest,
} from "../../../../slices/projects";

import { icons } from "./icons";

export default function ProjectForm({ setOpen, project }) {
  const { register, handleSubmit, reset, setValue, watch } = useForm({});

  const dispatch = useDispatch();
  const onSubmit = (values) => {
    if (project) {
      dispatch(updateProjectRequest({ id: project.id, ...values }));
    } else {
      dispatch(insertProjectRequest({ ...values }));
    }
    setOpen(false);
    reset();
  };

  useEffect(() => {
    if (project) {
      setValue("c_nombre", project.c_nombre);
      setValue("c_link", project.c_link);
      setValue("c_icono", project.c_icono);
    }
  }, [project, setValue]);

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl mb-5 text-center">
        {project ? "Editar Proyecto" : "Agregar Proyecto"}
      </h1>
      <div className="flex flex-col items-center w-full">
        <TextField
          sx={{ width: "15rem", mb: 2 }}
          autoComplete="off"
          label="Nombre"
          type="text"
          size="small"
          {...register("c_nombre", { required: true })}
        />
        <TextField
          sx={{ width: "15rem", mb: 2 }}
          autoComplete="off"
          label="Link"
          type="text"
          size="small"
          {...register("c_link", { required: true })}
        />
        {/* <TextField
          sx={{ width: "15rem", mb: 2 }}
          autoComplete="off"
          label="Link Hub"
          type="text"
          size="small"
          {...register("c_link_hub", { required: true })}
        /> */}
        <div className="grid grid-cols-5 gap-2 mt-4 mb-4 justify-center items-center">
          {icons.map((icon) => {
            return (
              <label
                key={icon}
                className="flex items-center justify-center flex-col"
              >
                <input
                  {...register("c_icono")}
                  type="radio"
                  value={icon}
                  onClick={(e) => e.target.checked && setValue("c_icono", icon)}
                />
                <IconContainer selected={watch("c_icono") === icon}>
                  <Icon>{icon}</Icon>
                </IconContainer>
              </label>
            );
          })}
        </div>
        <div className="flex justify-center mt-8">
          <Button variant="contained" type="submit" size="small">
            {project ? "Actualizar" : "Agregar"}
          </Button>
        </div>
      </div>
    </form>
  );
}
