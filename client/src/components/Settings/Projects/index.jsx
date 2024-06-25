import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import _ from "lodash";

import ProjectsTable from "./ProjectsTable";
import ProjectForm from "./ProjectForm";
import { ProjectAlert } from "./ProjectAlert";
import { fetchProjectsRequest } from "../../../slices/projects";
import { Spinner } from "../../Spinner";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Projects = () => {
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [project, setProject] = useState(null);
  const { data, isFetching, didError } = useSelector((state) => state.projects);
  const list = _.filter(data, (project) => project.n_externo === false);

  const handleOnFormClose = () => {
    setOpenForm(false);
  };

  const handleAlertOnClose = () => {
    setOpenAlert(false);
  };

  const handleAddProject = () => {
    setProject(null);
    setOpenForm(true);
  };

  const handleClickEditProject = (project) => {
    setProject(project);
    setOpenForm(true);
  };

  const handleDeleteProject = (project) => {
    setProject(project);
    setOpenAlert(true);
  };

  useEffect(() => {
    dispatch(fetchProjectsRequest());
  }, [dispatch]);
  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : didError ? (
        <div>Error</div>
      ) : (
        <>
          <ProjectsTable
            list={list}
            handleAddProject={handleAddProject}
            handleClickEditProject={handleClickEditProject}
            handleDeleteProject={handleDeleteProject}
          />
          <Modal open={openForm} onClose={handleOnFormClose}>
            <Box sx={style}>
              <IconButton
                aria-label="close"
                size="small"
                onClick={handleOnFormClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
              <ProjectForm setOpen={setOpenForm} project={project} />
            </Box>
          </Modal>
          <ProjectAlert
            open={openAlert}
            setProject={setProject}
            project={project}
            onClose={handleAlertOnClose}
          />
        </>
      )}
    </>
  );
};

export default Projects;
