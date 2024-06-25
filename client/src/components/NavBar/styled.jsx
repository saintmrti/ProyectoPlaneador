import styled from "styled-components";
import Typography from "@mui/material/Typography";

export const ProfileWrapper = styled.div`
  padding: 1em 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UserName = styled.div`
  margin-top: 16px;
  font-weight: 500;
`;

export const UserEmail = styled(Typography)`
  font-size: 14px;
  margin-bottom: 16px;
`;
