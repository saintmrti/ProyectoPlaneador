import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import _ from "lodash";

import { fetchRequirementRequest } from "../../slices/requirement";
import { fetchCapacityRequest } from "../../slices/capacity";
import { fetchProductsRequest } from "../../slices/products";
import { invDocumentsRequest, changeDocuments } from "../../slices/documents";
import { fetchSlicedRequest } from "../../slices/sliced";
import { fetchParametersRequest } from "../../slices/parameters";
import { fetchSlicedOrdersRequest } from "../../slices/slicedOrders";
import { getRequirement } from "../../selectors/requirement";
import ProgrammerTable from "./ProgrammerTable";
import DialogProgramV2 from "./Sliced/DialogProgramV2";
import AlertDelete from "./AlertDelete";
import AlertSuccess from "../Production/AlertSuccess";
import { FileUploader } from "./FileUploader";
import { changeDate } from "../../slices/date";
import { Spinner } from "../Spinner";

const Programmer = () => {
  const dispatch = useDispatch();
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertKanban, setOpenAlertKanban] = useState(false);
  const [realPlan, setRealPlan] = useState([]);
  const [slicedOrders, setSlicedOrders] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [clonPlan, setClonPlan] = useState([]);

  const { requirements, ordersPlan } = useSelector(getRequirement);
  const { data: sliced } = useSelector((state) => state.sliced);
  const { date } = useSelector((state) => state.date);
  const { isFetching, didError, isFetchingInsert, didErrorInsert } =
    useSelector((state) => state.requirement);
  const { data: products } = useSelector((state) => state.products);
  const { data: kanban } = useSelector((state) => state.slicedOrders);

  const handleChangeDate = (newDate) => {
    dispatch(changeDate(newDate));
  };

  const handleUpload = async () => {
    const f = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      f.append("files", selectedFiles[i]);
    }
    f.append("fecha", date);
    setDeleteBtn(true);
    dispatch(invDocumentsRequest(f));
  };

  const handleDateChange = (event) => {
    const { value } = event.target;
    handleChangeDate(value);
    dispatch(fetchRequirementRequest({ date: value }));
    dispatch(fetchSlicedRequest({ date: value }));
  };

  useEffect(() => {
    dispatch(fetchRequirementRequest({ date }));
    dispatch(fetchSlicedRequest({ date }));
    dispatch(fetchCapacityRequest());
    dispatch(fetchParametersRequest());
    dispatch(fetchProductsRequest());
    dispatch(fetchSlicedOrdersRequest({ date }));
  }, [dispatch]);

  useEffect(() => {
    if (!_.isEmpty(requirements)) {
      dispatch(changeDocuments(false));
    }
  }, [requirements, dispatch]);

  return (
    <>
      {isFetching || isFetchingInsert ? (
        <Spinner />
      ) : didError || didErrorInsert ? (
        <h1>Error</h1>
      ) : (
        <>
          {!_.isEmpty(requirements) ? (
            <ProgrammerTable
              sliced={sliced?.pedido}
              date={date}
              realPlan={realPlan}
              setRealPlan={setRealPlan}
              handleChangeDate={handleChangeDate}
              list={requirements}
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              openDelete={openDelete}
              setOpenDelete={setOpenDelete}
              products={products}
              ordersPlan={ordersPlan}
              setClonPlan={setClonPlan}
              kanban={kanban}
            />
          ) : (
            <Box sx={{ height: "calc(100vh - 125px)" }}>
              <Paper
                sx={{ width: "100%", height: "100%", overflow: "hidden", p: 2 }}
              >
                <div className="flex justify-between w-full">
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Programador
                  </Typography>
                  <TextField
                    id="date"
                    label="Fecha"
                    type="date"
                    size="small"
                    value={date}
                    onChange={handleDateChange}
                    sx={{ width: "15rem", ml: "auto" }}
                  />
                </div>
                <FileUploader
                  onUpload={handleUpload}
                  setSelectedFiles={setSelectedFiles}
                  selectedFiles={selectedFiles}
                  date={date}
                  setDeleteBtn={setDeleteBtn}
                  deleteBtn={deleteBtn}
                />
              </Paper>
            </Box>
          )}
          <DialogProgramV2
            date={date}
            openDialog={openDialog}
            setOpen={setOpenDialog}
            open={openDialog}
            realPlan={realPlan}
            sliced={sliced?.pedido}
            setRealPlan={setRealPlan}
            setSlicedOrders={setSlicedOrders}
            slicedOrders={slicedOrders}
            setOpenAlertKanban={setOpenAlertKanban}
            setOpenAlert={setOpenAlert}
            kanban={kanban}
            clonPlan={clonPlan}
          />
          <AlertDelete date={date} open={openDelete} setOpen={setOpenDelete} />
          <AlertSuccess
            text="¡Kanban generado con éxito!"
            open={openAlertKanban}
            setOpen={setOpenAlertKanban}
          />
          <AlertSuccess
            text="¡Ordenes guardadas con éxito!"
            open={openAlert}
            setOpen={setOpenAlert}
          />
        </>
      )}
    </>
  );
};

export default Programmer;
