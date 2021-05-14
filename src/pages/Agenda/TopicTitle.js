import styled from "styled-components";

export default function TopicTitle() {
  return <Container>&lt;TopicTitle /&gt;</Container>;
}

const Container = styled.div`
  grid-area: 1 / 3 / 2 / 9;
  background-color: lightgreen;

  display: flex;
  align-items: center;
  justify-content: center;
`;
