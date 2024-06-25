import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";

import { fetchCapacityRequest } from "../../slices/capacity";
import { fetchProjectsRequest } from "../../slices/projects";
import { fetchParametersRequest } from "../../slices/parameters";
import { getSlicedCapacity } from "../../selectors/capacity";
import { Spinner } from "../Spinner";
import CapacityTable from "./CapacityTable";
import CapacityForm from "./CapacityForm";
import Sliced from "./Sliced";
import Alert from "./Alert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Capacity = () => {
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [showSliced, setShowSliced] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [selectedArr, setSelectedArr] = useState([]);
  const [selectedLine, setSelectedLine] = useState(0);

  const { isFetching, didError } = useSelector((state) => state.capacity);
  const slicedCapacity = useSelector(getSlicedCapacity);

  const handleOnCloseForm = () => {
    setOpenForm(false);
  };

  useEffect(() => {
    dispatch(fetchCapacityRequest());
    dispatch(fetchProjectsRequest());
    dispatch(fetchParametersRequest());
  }, [dispatch]);

  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : didError ? (
        <p>Error</p>
      ) : (
        <Box>
          {showSliced ? (
            <>
              <Sliced
                setEditProduct={setEditProduct}
                setOpenAlert={setOpenAlert}
                setOpenForm={setOpenForm}
                selectedArr={slicedCapacity}
                setDeleteProduct={setDeleteProduct}
                setSelectedArr={setSelectedArr}
                setShowSliced={setShowSliced}
                showSliced={showSliced}
                data={slicedCapacity}
                selectedLine={selectedLine}
                setSelectedLine={setSelectedLine}
              />
            </>
          ) : (
            <CapacityTable
              setEditProduct={setEditProduct}
              setDeleteProduct={setDeleteProduct}
              setOpenAlert={setOpenAlert}
              setOpenForm={setOpenForm}
              selectedArr={selectedArr}
              setSelectedArr={setSelectedArr}
              setShowSliced={setShowSliced}
              showSliced={showSliced}
              selectedLine={selectedLine}
              setSelectedLine={setSelectedLine}
            />
          )}
          <Modal open={openForm} onClose={handleOnCloseForm}>
            <Box sx={style}>
              <IconButton
                aria-label="close"
                size="small"
                onClick={handleOnCloseForm}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
              <CapacityForm
                selectedArr={selectedArr}
                editProduct={editProduct}
                setEditProduct={setEditProduct}
                setOpenForm={setOpenForm}
                showSliced={showSliced}
              />
            </Box>
          </Modal>
          <Alert
            open={openAlert}
            onClose={() => setOpenAlert(false)}
            deleteProduct={deleteProduct}
            setDeleteProduct={setDeleteProduct}
          />
        </Box>
      )}
    </>
  );
};

export default Capacity;
