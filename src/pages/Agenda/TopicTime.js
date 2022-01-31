import { useState } from "react";
import { round } from "../../lib";
import styled from "styled-components";

export default function TopicTime({ total, actual }) {
  const [fillPercent, setFillPercent] = useState(
    actual === undefined ? "100%" : (actual / total) * 100 + "%"
  );

  console.log(actual, total, actual / total);

  const [color, setColor] = useState("green");

  return (
    <Container preserveAspectRatio="none">
      <Glass
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        x="0px"
        y="0px"
      >
        <defs>
          <linearGradient id="partial-fill" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor={color} />
            <stop offset={fillPercent} stopColor={color} />
            <stop offset={fillPercent} stopColor="transparent" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <g fill="url(#partial-fill)" data-name="hourglass">
          <path d="M20,16.168v.152a10.019,10.019,0,0,1,6,9.168v4a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1v-4a10.019,10.019,0,0,1,6-9.168v-.153A10.019,10.019,0,0,1,6,7V3A1,1,0,0,1,7,2H25a1,1,0,0,1,1,1V7A10.021,10.021,0,0,1,20,16.168Z"></path>
        </g>
      </Glass>
      <span>{round(total)} min</span>
    </Container>
  );
}

const Glass = styled.svg`
  width: 4.2em;
  stroke: green;
  stroke-width: 2px;
  fill: transparent;
  transform: rotate(180deg);
`;

const Container = styled.span`
  grid-area: 1 / 6 / 2 / 7;
  background-color: orange;
  display: flex;
  justify-content: center;
  align-items: center;
`;
