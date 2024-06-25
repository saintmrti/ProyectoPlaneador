import styled from "styled-components";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 10px;
  height: 100%;
`;

export const Secc1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const Secc2 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  justify-content: center;
  align-items: center;

  @media (max-width: 1680px) and (min-width: 1460px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1459px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const MDBox = styled.div`
  border-radius: 10px;
  background-color: #ee9216;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  @media (max-width: 1024px) {
    width: 2rem;
    height: 2rem;
  }
`;

export const MuiCardMedia = styled(CardMedia)`
  transition: transform 0.3s ease;
  border-radius: 5px;
  max-height: 120px;
  /* @media (max-width: 1024px) {
        max-height: 80px;
    } */
`;

export const MuiCard1 = styled(Card)`
  min-width: 150px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin-bottom: 15px;
  transition: background-color 0.3s ease;
  border: none;
  cursor: pointer;

  &:hover {
    ${MDBox} {
      transform: translateY(-10px);
    }
  }
`;

export const MuiCard2 = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 275px;
  min-height: 170px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
  border: none;

  &:hover {
    ${MuiCardMedia} {
      transform: translateY(-10px);
    }
  }
`;

export const Title = styled.div`
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
`;

export const TitleSec = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 15px;
  text-align: center;
  /* color: #394767; */
`;

export const StyledIcon = styled.img`
  width: 3rem;
  height: 3rem;

  @media (max-width: 1024px) {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
