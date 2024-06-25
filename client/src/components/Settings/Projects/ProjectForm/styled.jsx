import styled from "styled-components";
import { css } from "styled-components";
import Avatar from "@mui/material/Avatar";

export const IconContainer = styled(Avatar)`
  font-weight: bold;
  margin-top: 0.5rem;
  cursor: pointer;
  ${({ selected }) =>
    selected &&
    css`
      background-color: #ececec;
      color: #333;
      border-radius: 50%;
    `}
`;
