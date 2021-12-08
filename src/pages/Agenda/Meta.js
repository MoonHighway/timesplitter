import styled from "styled-components";
import { StartButton } from "../../ui";
import { colors } from "../../theme";

export default function Meta({ title }) {
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
  background-color: ${colors.meta};

  .btn-start {
    position: fixed;
    top: 10px;
    right: 10px;
  }
`;
