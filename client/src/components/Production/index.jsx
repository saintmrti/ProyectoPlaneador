import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import _ from "lodash";

import ProductionForm from "./ProductionForm";
import ProductionTable from "./ProductionTable";
import AlertSuccess from "./AlertSuccess";
import { Spinner } from "../Spinner";
import { changeDate } from "../../slices/date";
import { fetchCapacityRequest } from "../../slices/capacity";
import {
  fetchProductionRequest,
  updateProductionRequest,
  deleteProductionRequest,
  hideProductionRequest,
  sequenceProductionRequest,
} from "../../slices/production";
import { getProduction } from "../../selectors/produccion";

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

const Production = () => {
  const dispatch = useDispatch();
  const [openProd, setOpenProd] = useState(false);
  const [product, setProduct] = useState(null);
  const [planProd, setPlanProd] = useState([]);
  const [originalPlanProd, setOriginalPlanProd] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [editPlanProd, setEditPlanProd] = useState(false);

  const production = useSelector(getProduction);
  const { isFetching, didError } = useSelector((state) => state.production);
  const { date } = useSelector((state) => state.date);

  const handleDeleteProd = (idProd) => {
    if (planProd.every((item) => item?.kanban === false)) {
      dispatch(deleteProductionRequest({ idProd }));
    } else {
      dispatch(hideProductionRequest({ idProd }));
    }
  };

  const handleOnCloseProd = () => {
    setOpenProd(false);
    setProduct(null);
  };

  const handleChangeDate = (newDate) => {
    dispatch(changeDate(newDate));
    dispatch(fetchProductionRequest({ date: newDate }));
  };

  const handleSaveProd = () => {
    dispatch(updateProductionRequest({ date, setOpenAlert }));
  };

  const handleCancelEdit = () => {
    setPlanProd(originalPlanProd);
    setEditPlanProd(false);
  };

  const handleEditKanban = () => {
    setOriginalPlanProd(_.cloneDeep(planProd));
    setEditPlanProd(true);
  };

  const handleSaveKanban = () => {
    const kanba = _.map(planProd, (item) => ({
      idOrdenProduccion: item.id,
      fecha_mezclado: `${date} ${item.procesos[0].inicio}:00`,
    }));
    dispatch(sequenceProductionRequest({ production_orders: kanba, date }));
    setEditPlanProd(false);
  };

  useEffect(() => {
    if (production) {
      setPlanProd(production);
    }
  }, [production]);

  useEffect(() => {
    if (planProd.length === 0) {
      setEditPlanProd(false);
    }
  }, [planProd]);

  useEffect(() => {
    dispatch(fetchCapacityRequest());
    dispatch(fetchProductionRequest({ date }));
  }, [dispatch]);

  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : didError ? (
        <div>Error</div>
      ) : (
        <>
          <Card>
            <CardContent>
              <div className="flex items-center mb-2">
                <Typography variant="h6" component="span">
                  Agregar SKU
                </Typography>
                <IconButton size="small" onClick={() => setOpenProd(true)}>
                  <AddIcon />
                </IconButton>
                <div className="ml-auto flex items-center">
                  {planProd.length > 1 && (
                    <>
                      {editPlanProd ? (
                        <Fragment>
                          <Button
                            sx={{ mr: 1 }}
                            variant="contained"
                            color="error"
                            onClick={() => handleCancelEdit()}
                          >
                            Cancelar
                          </Button>
                          <Button
                            sx={{ mr: 1 }}
                            variant="contained"
                            onClick={() => handleSaveKanban()}
                          >
                            Actualizar Ordenes
                          </Button>
                        </Fragment>
                      ) : (
                        <Button
                          sx={{ mr: 1 }}
                          variant="contained"
                          onClick={() => handleEditKanban()}
                        >
                          Modificar Secuencia
                        </Button>
                      )}
                    </>
                  )}
                  {planProd.length > 0 &&
                    !planProd.every((item) => item?.kanban === true) &&
                    !editPlanProd && (
                      <Button
                        sx={{ mr: 1 }}
                        variant="contained"
                        onClick={handleSaveProd}
                      >
                        Generar Kanban
                      </Button>
                    )}
                  <TextField
                    id="date"
                    label="Fecha"
                    type="date"
                    size="small"
                    value={date}
                    onChange={(e) => handleChangeDate(e.target.value)}
                    sx={{ width: "15rem" }}
                  />
                </div>
              </div>
              <ProductionTable
                planProd={planProd}
                setPlanProd={setPlanProd}
                editPlanProd={editPlanProd}
                setOriginalPlanProd={setOriginalPlanProd}
                handleDeleteProd={handleDeleteProd}
                handleCancelEdit={handleCancelEdit}
              />
            </CardContent>
          </Card>
          <Modal open={openProd} onClose={handleOnCloseProd}>
            <Box sx={style}>
              <IconButton
                aria-label="close"
                size="small"
                onClick={handleOnCloseProd}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
              <ProductionForm
                date={date}
                planProd={planProd}
                setPlanProd={setPlanProd}
                setProduct={setProduct}
                product={product}
              />
            </Box>
          </Modal>
          <AlertSuccess
            text="¡Kanban generado con éxito!"
            open={openAlert}
            setOpen={setOpenAlert}
          />
        </>
      )}
    </>
  );
};

export default Production;
