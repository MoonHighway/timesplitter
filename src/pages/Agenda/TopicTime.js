import styled from "styled-components";

export default function TopicTime({ length, est }) {
  return <Container>{length || est}</Container>;
}

const Container = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  background-color: orange;

  font-size: 4em;

  display: flex;
  align-items: center;
  justify-content: center;
`;
