import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { fetchProjectsRequest } from "../../slices/projects";
import { useEffect } from "react";

const NavProduction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjectsRequest());
  }, [dispatch]);
  return (
    <Box>
      <div className="flex mb-2 z-20 relative">
        <Button
          variant="contained"
          onClick={() => navigate("/planeacion/programador")}
          sx={{
            background:
              location.pathname != "/planeacion/programador" && "#74A1CD",
            mr: 1,
          }}
        >
          Programador
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("/planeacion/historico")}
          sx={{
            background:
              location.pathname != "/planeacion/historico" && "#74A1CD",
            mr: 1,
          }}
        >
          Acumulado
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("/planeacion/produccion")}
          sx={{
            background:
              location.pathname != "/planeacion/produccion" && "#74A1CD",
          }}
        >
          Programa Celda
        </Button>
      </div>
      <Outlet />
    </Box>
  );
};

export default NavProduction;
