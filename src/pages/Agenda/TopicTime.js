import { useState } from "react";
import { round } from "../../lib";
import { fonts } from "../../theme";
import styled from "styled-components";

function makeReadableTime(time = 0) {
  if (time === 0) {
    return "on time";
  }
  if (time >= 60) {
    let h = Math.floor(time / 60);
    let m = time % 60;
    return `${h} hr ${m > 0 ? `${m} min` : ""}`;
  }
  return `${time} min`;
}

export default function TopicTime({
  total,
  actual,
  size = "md",
  showTime = true,
}) {
  const [fillPercent, setFillPercent] = useState(
    actual === undefined ? "100%" : (actual / total) * 100 + "%"
  );
  const [color, setColor] = useState({
    stroke: "darkgreen",
    fill: "lightgreen",
  });

  return (
    <Container preserveAspectRatio="none" size={size}>
      <Glass
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        x="0px"
        y="0px"
      >
        <defs>
          <linearGradient id="partial-fill" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor={color.fill} />
            <stop offset={fillPercent} stopColor={color.fill} />
            <stop offset={fillPercent} stopColor="transparent" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <g
          fill="url(#partial-fill)"
          data-name="hourglass"
          stroke={color.stroke}
        >
          <path d="M20,16.168v.152a10.019,10.019,0,0,1,6,9.168v4a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1v-4a10.019,10.019,0,0,1,6-9.168v-.153A10.019,10.019,0,0,1,6,7V3A1,1,0,0,1,7,2H25a1,1,0,0,1,1,1V7A10.021,10.021,0,0,1,20,16.168Z"></path>
        </g>
      </Glass>
      {showTime && (
        <TimeText color={color.stroke}>
          {makeReadableTime(round(total))}
        </TimeText>
      )}
    </Container>
  );
}

const TimeText = styled.span`
  color: ${(props) => props.color};
  font-family: ${fonts.subtitle};
  font-size: 1.25em;
  font-weight: bold;
`;

const Glass = styled.svg`
  width: 4.2em;
  stroke-width: 2px;
  fill: transparent;
  transform: rotate(180deg);
`;

const Container = styled.span`
  grid-area: 1 / 6 / 2 / 7;
  display: flex;
  justify-content: center;
  align-items: center;

  transform: scale(
    ${(props) =>
      props.size === "xs"
        ? 0.3
        : props.size === "sm"
        ? 0.5
        : props.size === "lg"
        ? 1.5
        : props.size === "xl"
        ? 2
        : 1}
  );
`;
