import styled from "styled-components";
import { getTypeColor } from "../../theme";

export default function TopicIconInfo({ type }) {
  return <Container>{type}</Container>;
}

const Container = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  background-color: ${getTypeColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;
