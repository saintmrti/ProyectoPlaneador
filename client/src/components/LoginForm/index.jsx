import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import { Error } from "./Error";
// import { validate } from "./validate";
import { Wrapper, FormContent, Logo, Content, ButtonWrapper } from "./styled";
import logo from "../../assets/img/logo.png";
import { authRequest } from "../../slices/auth";
// import { authRequest } from "../../slices/auth";

export const LoginForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    const credentials = {
      email: values.email,
      password: values.password,
    };
    dispatch(authRequest(credentials));
    reset();
  };
  // const noSirve = false;
  const { isAuth, isFetching, didError, status } = useSelector(
    (state) => state.auth
  );
  return isAuth ? (
    <Navigate to="/" />
  ) : (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "50px" }}>
        <FormContent>
          <Logo src={logo} />
          <Content>
            {didError && <Error message={status} />}
            <Stack direction="column" spacing={2}>
              <TextField
                name="email"
                label="Correo"
                type="text"
                {...register("email", { required: true })}
              />
              <TextField
                name="password"
                label="Contraseña"
                type="password"
                {...register("password", { required: true })}
              />
            </Stack>
            <ButtonWrapper>
              <Button
                disabled={isFetching}
                type="submit"
                variant="contained"
                color="primary"
              >
                {isFetching ? "Espere..." : "Iniciar sesión"}
              </Button>
            </ButtonWrapper>
          </Content>
        </FormContent>
      </form>
    </Wrapper>
  );
};

export default LoginForm;
