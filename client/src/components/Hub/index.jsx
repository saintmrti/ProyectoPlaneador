import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import _ from "lodash";
import { Spinner } from "../Spinner";

import {
  Wrapper,
  Secc1,
  Secc2,
  MDBox,
  Title,
  StyledIcon,
  MuiCard1,
  MuiCard2,
  TitleSec,
  MuiCardMedia,
} from "./styled";
import Kanban from "../../assets/icons/kanban.png";
import Planeacion from "../../assets/icons/planeacion.png";
import Fmds from "../../assets/icons/fmds.png";
import TpzRender from "../../assets/img/tpz_render.png";
import MtyRender from "../../assets/img/mty_render.png";
import QroRender from "../../assets/img/qro_render.png";
import Indicadores from "../../assets/icons/indicadores.png";
import { fetchProjectsRequest } from "../../slices/projects";

export default function Hub() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjectsRequest());
  }, [dispatch]);
  const { data, isFetching, didError } = useSelector((state) => state.projects);
  const auth = useSelector((state) => state.auth);
  const fmds = _.find(data, (d) => d.id === 3 && d.n_externo === true);
  const kanban = _.find(data, (d) => d.id === 4 && d.n_externo === true);
  const multivac = _.find(data, (d) => d.id === 6 && d.n_externo === true);

  useEffect;
  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : didError ? (
        <div>Error</div>
      ) : (
        <Wrapper>
          <div
            style={{
              gridColumn: "1/2",
              backgroundColor: "#FFFFFF",
              borderRadius: "5px",
            }}
          >
            <TitleSec>Reporteo e Indicadores</TitleSec>
            <Secc1>
              {kanban && (
                <MuiCard1
                  sx={{
                    "&:hover": {
                      backgroundColor: "#eeeeee",
                    },
                  }}
                  onClick={() => (window.location.href = kanban?.c_link)}
                >
                  <CardContent
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <MDBox>
                      <StyledIcon src={Kanban} alt="Icono_Indicadores" />
                    </MDBox>
                    <div style={{ textAlign: "right", paddingTop: "10px" }}>
                      <Title>{kanban?.c_nombre}</Title>
                    </div>
                  </CardContent>
                </MuiCard1>
              )}
              {fmds && (
                <MuiCard1
                  sx={{
                    "&:hover": {
                      backgroundColor: "#eeeeee",
                    },
                  }}
                  onClick={() =>
                    (window.location.href = `${fmds?.c_link}?token=${auth.token}`)
                  }
                >
                  <CardContent
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <MDBox style={{ backgroundColor: "#60A44D" }}>
                      <StyledIcon src={Fmds} alt="Mi Icono" />
                    </MDBox>
                    <div style={{ textAlign: "right", paddingTop: "10px" }}>
                      <Title>{fmds?.c_nombre}</Title>
                    </div>
                  </CardContent>
                </MuiCard1>
              )}
              <MuiCard1
                sx={{
                  "&:hover": {
                    backgroundColor: "#eeeeee",
                  },
                }}
                onClick={() => navigate("/planeacion/programador")}
              >
                <CardContent
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <MDBox style={{ backgroundColor: "#477EE9" }}>
                    <StyledIcon src={Planeacion} alt="Mi Icono" />
                  </MDBox>
                  <div style={{ textAlign: "right", paddingTop: "10px" }}>
                    <Title>Planeación</Title>
                  </div>
                </CardContent>
              </MuiCard1>
              {multivac && (
                <MuiCard1
                  sx={{
                    "&:hover": {
                      backgroundColor: "#eeeeee",
                    },
                  }}
                  onClick={() =>
                    (window.location.href = `${multivac?.c_link}?token=${auth.token}`)
                  }
                >
                  <CardContent
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <MDBox style={{ backgroundColor: "#f51919" }}>
                      <StyledIcon src={Indicadores} alt="Mi Icono" />
                    </MDBox>
                    <div style={{ textAlign: "right", paddingTop: "10px" }}>
                      <Title>{multivac?.c_nombre}</Title>
                    </div>
                  </CardContent>
                </MuiCard1>
              )}
            </Secc1>
          </div>
          <div
            style={{
              gridColumn: "2/5",
              backgroundColor: "#FFFFFF",
              borderRadius: "5px",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            <TitleSec>Operación Digital</TitleSec>
            <Secc2>
              <div>
                <CardActionArea onClick={(f) => f}>
                  <MuiCard2
                    sx={{
                      "&:hover": {
                        backgroundColor: "#eeeeee",
                      },
                    }}
                  >
                    <CardContent>
                      <MuiCardMedia component="img" src={MtyRender} />
                      <Title style={{ paddingTop: "10px" }}>Monterrey</Title>
                    </CardContent>
                  </MuiCard2>
                </CardActionArea>
              </div>
              <div>
                <CardActionArea onClick={(f) => f}>
                  <MuiCard2
                    sx={{
                      "&:hover": {
                        backgroundColor: "#eeeeee",
                      },
                    }}
                  >
                    <CardContent>
                      <MuiCardMedia component="img" src={TpzRender} />
                      <Title style={{ paddingTop: "10px" }}>Tepotzotlán</Title>
                    </CardContent>
                  </MuiCard2>
                </CardActionArea>
              </div>
              <div>
                <CardActionArea onClick={(f) => f}>
                  <MuiCard2
                    sx={{
                      "&:hover": {
                        backgroundColor: "#eeeeee",
                      },
                    }}
                  >
                    <CardContent>
                      <MuiCardMedia component="img" src={QroRender} />
                      <Title style={{ paddingTop: "10px" }}>Querétaro</Title>
                    </CardContent>
                  </MuiCard2>
                </CardActionArea>
              </div>
              {/* <div>
              <CardActionArea onClick={() => goTo("/hub/uen/4")}>
                <MuiCard2
                  sx={{
                    "&:hover": {
                      backgroundColor:
                        theme === "light" ? "#eeeeee" : "#212121",
                    },
                  }}
                >
                  <CardContent>
                    <MuiCardMedia component="img" src={Construccion} />
                    <Title style={{ paddingTop: "10px" }}>Construcción</Title>
                  </CardContent>
                </MuiCard2>
              </CardActionArea>
            </div>
            <div>
              <CardActionArea onClick={() => goTo("/hub/uen/5")}>
                <MuiCard2
                  sx={{
                    "&:hover": {
                      backgroundColor:
                        theme === "light" ? "#eeeeee" : "#212121",
                    },
                  }}
                >
                  <CardContent>
                    <MuiCardMedia component="img" src={Multipak} />
                    <Title style={{ paddingTop: "15px" }}>Multipak</Title>
                  </CardContent>
                </MuiCard2>
              </CardActionArea>
            </div>
            <div>
              <CardActionArea onClick={() => goTo("/hub/uen/6")}>
                <MuiCard2
                  sx={{
                    "&:hover": {
                      backgroundColor:
                        theme === "light" ? "#eeeeee" : "#212121",
                    },
                  }}
                >
                  <CardContent>
                    <MuiCardMedia component="img" src={Vialutek} />
                    <Title style={{ paddingTop: "10px" }}>Vialutek</Title>
                  </CardContent>
                </MuiCard2>
              </CardActionArea>
            </div>
            <div style={{ gridColumn: "2/3" }}>
              <CardActionArea onClick={() => goTo("/hub/uen/8")}>
                <MuiCard2
                  sx={{
                    "&:hover": {
                      backgroundColor:
                        theme === "light" ? "#eeeeee" : "#212121",
                    },
                  }}
                >
                  <CardContent>
                    <MuiCardMedia component="img" src={LaSalle} />
                    <Title style={{ paddingTop: "10px" }}>LaSalle</Title>
                  </CardContent>
                </MuiCard2>
              </CardActionArea>
            </div> */}
            </Secc2>
          </div>
        </Wrapper>
      )}
    </>
  );
}
