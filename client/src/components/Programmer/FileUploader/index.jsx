import { useState, Fragment, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import moment from "moment-timezone";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

import {
  insertRequirementRequest,
  deleteRequirementRequest,
} from "../../../slices/requirement";
import {
  requirementValidator,
  inventoryValidator,
  orderValidator,
  weekValidator,
} from "../FileUploader/fileValidator";

import { changeDocuments } from "../../../slices/documents";

export function FileUploader({
  onUpload,
  selectedFiles,
  setSelectedFiles,
  date,
  setDeleteBtn,
  deleteBtn,
}) {
  const {
    isFetchingWeek,
    didErrorWeek,
    isFetchingWip,
    didErrorWip,
    isFetchingReq,
    didErrorReq,
    isFetchingInv,
    didErrorInv,
    data,
  } = useSelector((state) => state.documents);
  const dispatch = useDispatch();
  const fileInput = useRef(null);
  const [filesRejected, setFilesRejected] = useState([]);
  const [errorFiles, setErrorFiles] = useState([]);
  const onDrop = (acceptedFiles, rejectedFiles) => {
    setErrorFiles([]);
    setDeleteBtn(false);
    const promises = acceptedFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(file);
        };
        reader.readAsDataURL(file);
      });
    });
    setFilesRejected(rejectedFiles.length > 0 ? rejectedFiles : []);
    Promise.all(promises).then((result) => {
      if (result.length > 0) {
        validatorFiles(result);
      }
    });
  };

  const handleButtonClick = () => {
    // trigger the click event of the hidden file input
    fileInput.current.click();
  };

  const handleFileChange = (event) => {
    // Agrega los archivos seleccionados a selectedFiles
    setSelectedFiles((prevFiles) => [...prevFiles, ...event.target.files]);
    validatorFiles([...selectedFiles, ...event.target.files]);
  };

  const handleDeleteFile = (file) => {
    return () => {
      const files = selectedFiles.filter((f) => f.name !== file);
      setSelectedFiles(files);
      validatorFiles(files);
    };
  };

  const handleClear = () => {
    dispatch(deleteRequirementRequest({ date }));
    dispatch(changeDocuments(false));
    setSelectedFiles([]);
    setFilesRejected([]);
    setErrorFiles([]);
  };

  const generateProgram = () => {
    dispatch(insertRequirementRequest({ date }));
    dispatch(changeDocuments(false));
    setDeleteBtn(false);
    setSelectedFiles([]);
  };

  const validatorFiles = (files) => {
    const errorFiles = [];
    let inv = false;
    let req = false;
    let ord = false;
    let wee = false;

    files.forEach((file) => {
      if (requirementValidator(file.name)) {
        req = true;
      }
      if (inventoryValidator(file.name)) {
        inv = true;
      }
      if (orderValidator(file.name)) {
        ord = true;
      }
      if (weekValidator(file.name)) {
        wee = true;
      }
    });
    if (!ord)
      errorFiles.push(
        `El archivo "Pedido ${moment(date).format(
          "DD [de] MMM"
        )}.xlsx" no se encontro`
      );
    if (!inv)
      errorFiles.push(`El archivo "Inventario Nacional.csv" no se encontro`);
    if (!req)
      errorFiles.push(
        `El archivo "Requerimiento Celda ${moment(date)
          .subtract(1, "days")
          .format("DD-MM-YY")}.xlsx" no se encontro`
      );
    if (!wee)
      errorFiles.push(
        `El archivo "Acumulado Rebanados Sem ${moment(date).format(
          "YYYY"
        )}.xlsx" no se encontro`
      );

    setSelectedFiles(files);
    setErrorFiles(errorFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "file/xlsx": [".xlsx"],
      "file/csv": [".csv"],
    },
  });
  return (
    <div className="grid grid-cols-3 gap-2 h-5/6">
      <div className="col-span-1">
        <div>
          <Typography
            sx={{ mt: 1, mb: 1, fontWeight: "bold", fontSize: "1.2rem" }}
            variant="h6"
            component="div"
          >
            Para continuar es necesario cargar los siguientes{" "}
            <UploadFileIcon fontSize="small" /> archivos:
          </Typography>
        </div>
        <div className="mb-2">
          <Typography sx={{ fontSize: "1.2rem" }} variant="h6" component="div">
            {`1. Pedido ${moment(date).format("DD [de] MMM")}.xlsx`}
          </Typography>
          <Typography sx={{ fontSize: "1.2rem" }} variant="h6" component="div">
            {`2. Inventario Nacional.csv`}
          </Typography>
          <Typography sx={{ fontSize: "1.2rem" }} variant="h6" component="div">
            {`3. Requerimiento Celda ${moment(date)
              .subtract(1, "days")
              .format("DD-MM-YY")}.xlsx`}
          </Typography>
          <Typography sx={{ fontSize: "1.2rem" }} variant="h6" component="div">
            {`4. Acumulado Rebanados Sem ${moment(date).format("YYYY")}.xlsx`}
          </Typography>
        </div>
      </div>
      <div className="col-span-2 overflow-auto">
        {filesRejected.length > 0 ? (
          <Box>
            <Grid item xs={12}>
              <Typography
                sx={{ mt: 4, mb: 2 }}
                variant="h6"
                component="div"
                style={{ textAlign: "center" }}
              >
                Los siguientes archivos no son validos
              </Typography>
              <div>
                <List>
                  {_.map(filesRejected, ({ file }) => (
                    <ListItem key={file.name}>
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={file.name}
                        secondary={moment(file.lastModified).format(
                          "DD [de] MMMM YYYY"
                        )}
                      />
                    </ListItem>
                  ))}
                </List>
              </div>
              <div className="flex justify-center items-center">
                <Button
                  sx={{ mr: 2 }}
                  variant="contained"
                  color="error"
                  onClick={() => setFilesRejected([])}
                >
                  Eliminar
                </Button>
              </div>
            </Grid>
          </Box>
        ) : selectedFiles.length > 0 ? (
          <Box>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{ mt: 4, mb: 2 }}
                variant="h6"
                component="div"
                style={{ textAlign: "center" }}
              >
                ¿Estas seguro de subir estos archivos?
              </Typography>
              <div>
                <List>
                  {_.map(selectedFiles, (file) => (
                    <ListItem
                      key={file.name}
                      secondaryAction={
                        <IconButton
                          onClick={handleDeleteFile(file.name)}
                          edge="end"
                          aria-label="delete"
                          disabled={deleteBtn}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={file.name}
                        secondary={moment(file.lastModified).format(
                          "DD [de] MMMM YYYY"
                        )}
                      />
                      {inventoryValidator(file.name) && (
                        <Box>
                          {isFetchingInv ? (
                            <CircularProgress size={20} />
                          ) : didErrorInv ? (
                            <HighlightOffRoundedIcon color="error" />
                          ) : data.inv_nacional ? (
                            <CheckCircleOutlineIcon color="success" />
                          ) : null}
                        </Box>
                      )}
                      {requirementValidator(file.name) && (
                        <Box>
                          {isFetchingReq ? (
                            <CircularProgress size={20} />
                          ) : didErrorReq ? (
                            <HighlightOffRoundedIcon color="error" />
                          ) : data.req_celda ? (
                            <CheckCircleOutlineIcon color="success" />
                          ) : null}
                        </Box>
                      )}
                      {orderValidator(file.name) && (
                        <Box>
                          {isFetchingWip ? (
                            <CircularProgress size={20} />
                          ) : didErrorWip ? (
                            <HighlightOffRoundedIcon color="error" />
                          ) : data.wip_jam ? (
                            <CheckCircleOutlineIcon color="success" />
                          ) : null}
                        </Box>
                      )}
                      {weekValidator(file.name) && (
                        <Box>
                          {isFetchingWeek ? (
                            <CircularProgress size={20} />
                          ) : didErrorWeek ? (
                            <HighlightOffRoundedIcon color="error" />
                          ) : data.week ? (
                            <CheckCircleOutlineIcon color="success" />
                          ) : null}
                        </Box>
                      )}
                    </ListItem>
                  ))}
                </List>
              </div>
              <div className="mb-10">
                {errorFiles.length > 0 &&
                  errorFiles.map((error) => (
                    <Typography
                      key={error}
                      sx={{ color: "red", fontSize: "1rem" }}
                      variant="h6"
                      component="div"
                      style={{ textAlign: "center" }}
                    >
                      {error}
                    </Typography>
                  ))}
                {selectedFiles.length > 4 && (
                  <Typography
                    sx={{ color: "red", fontSize: "1rem" }}
                    variant="h6"
                    component="div"
                    style={{ textAlign: "center" }}
                  >
                    Solo se pueden seleccionar 4 archivos
                  </Typography>
                )}
              </div>
              <div className="flex justify-center items-center">
                <Button
                  sx={{ mr: 2 }}
                  variant="contained"
                  color="error"
                  onClick={() => handleClear()}
                  disabled={
                    isFetchingInv ||
                    isFetchingReq ||
                    isFetchingWip ||
                    isFetchingWeek
                  }
                >
                  Cancelar
                </Button>
                {deleteBtn ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={generateProgram}
                    disabled={
                      data.inv_nacional &&
                      data.req_celda &&
                      data.wip_jam &&
                      data.week
                        ? false
                        : true
                    }
                  >
                    Generar Programa
                  </Button>
                ) : (
                  <Fragment>
                    {errorFiles.length > 0 ? (
                      <div>
                        <input
                          type="file"
                          style={{ display: "none" }}
                          ref={fileInput}
                          onChange={handleFileChange}
                          multiple // Permite seleccionar varios archivos
                        />
                        <Button variant="contained" onClick={handleButtonClick}>
                          Subir más archivos
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={selectedFiles.length > 4}
                        onClick={() => onUpload()}
                      >
                        Aceptar
                      </Button>
                    )}
                  </Fragment>
                )}
              </div>
            </Grid>
          </Box>
        ) : (
          <div {...getRootProps()} className="w-full h-full">
            <input {...getInputProps()} />
            <div
              className="flex items-center justify-center
                        h-full border-dashed border-4 border-gray-400 bg-gray-100 rounded-lg cursor-pointer"
            >
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-600">
                  <AttachFileIcon fontSize="small" />
                  Arrastra y suelta tus archivos aquí
                </p>
                <p className="text-sm text-gray-500">
                  o haz clic para seleccionar archivos
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
