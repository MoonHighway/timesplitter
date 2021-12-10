import { useEffect, useState } from "react";
import styled from "styled-components";

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export default function TopicTime({ title, length, est }) {
  const [time, setTime] = useState(length || est);

  return (
    <Container>
      <span>{round(time, 1)}</span>
    </Container>
  );
}

const Container = styled.span`
  grid-area: 1 / 6 / 2 / 7;
  background-color: orange;
`;
