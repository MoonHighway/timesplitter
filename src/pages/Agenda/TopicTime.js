import { useReducer, useEffect, useState } from "react";
import styled from "styled-components";

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export default function TopicTime({ title, length, est }) {
  const [time, setTime] = useState(length || est);

  //
  // TODO: Replace Quick timer
  //
  // This code was rushed to have some quick time indication
  //

  useEffect(() => {
    const to = setTimeout(() => setTime(time - 0.1), 6000);
    return () => clearTimeout(to);
  });

  useEffect(() => {
    setTime(length || est);
  }, [title]);

  if (length) {
    return (
      <Exact warning={time > 0 && time < 1} overTime={time < 0}>
        {round(time, 1)}
      </Exact>
    );
  }

  return (
    <Estimate warning={time > 0 && time < 1} overTime={time < 0}>
      {round(time, 1)}
    </Estimate>
  );
}

const Exact = styled.span`
  grid-area: 1 / 1 / 2 / 2;
  background-color: ${(props) =>
    props.warning ? "orange" : props.overTime ? "lightpink" : "lightgreen"};

  font-size: 4em;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: Verdana;
  font-size: 2em;
`;

const Estimate = styled.span`
  grid-area: 1 / 1 / 2 / 2;
  background-color: ${(props) =>
    props.warning ? "orange" : props.overTime ? "lightpink" : "lightgreen"};

  font-size: 4em;

  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Verdana;

  color: #787878;
  font-size: 2em;

  &:before {
    content: "~";
  }
`;
