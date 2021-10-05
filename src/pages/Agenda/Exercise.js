import styled from "styled-components";
import { StartButton } from "../../ui";
import { colors, fonts } from "../../theme";

export default function Exercise({ title }) {
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
  background-color: ${colors.exercise};

  .btn-start {
    position: fixed;
    top: 10px;
    right: 10px;
  }
`;
