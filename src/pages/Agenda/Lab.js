import styled from "styled-components";
import { StartButton } from "../../ui";
import { colors } from "../../theme";

export default function Lab({ title }) {
  return (
    <Container>
      <StartButton />
      <h1>{title}</h1>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.lab};

  .btn-start {
    position: fixed;
    top: 10px;
    right: 10px;
  }
`;
