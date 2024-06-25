import styled from "styled-components";
import Card from "@mui/material/Card";

export const Wrapper = styled.div`
  height: calc(100vh - 112px);
`;

export const FormContent = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: auto;
`;

export const Logo = styled.img`
  width: 70%;
  margin: auto;
  margin-top: 2em;
`;

export const Content = styled.div`
  margin-top: 2em;
  padding: 2em;
`;

export const ButtonWrapper = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  padding: 8px;
`;
