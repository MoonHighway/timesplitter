import { useState, useEffect } from "react";
import { round } from "../../lib";
import { fonts } from "../../theme";
import styled from "styled-components";

function makeReadableTime(time = 0) {
  if (isNaN(time) || time === 0) {
    return "move on";
  }
  if (time >= 60) {
    let h = Math.floor(time / 60);
    let m = time % 60;
    return `${h} hr ${m > 0 ? `${m} min` : ""}`;
  }
  if (time < 0) {
    let t = Math.round(Math.abs(time));
    let h = Math.floor(t / 60);
    let m = t % 60;
    if (!!h) {
      return `${h} hr ${m > 0 ? `${m} min` : ""}`;
    }
    return `${t} min`;
  }

  return `${time} min`;
}

function Glass({ stroke, fill, percent, glassNum }) {
  return (
    <GlassContainer
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      x="0px"
      y="0px"
    >
      <defs>
        <linearGradient
          id={`partial-fill-${glassNum}`}
          gradientTransform="rotate(90)"
        >
          <stop offset="0%" stopColor={fill} />
          <stop offset={percent} stopColor={fill} />
          <stop offset={percent} stopColor="transparent" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <g
        fill={`url(#partial-fill-${glassNum})`}
        data-name={`glass-${glassNum}`}
        stroke={stroke}
      >
        <path d="M20,16.168v.152a10.019,10.019,0,0,1,6,9.168v4a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1v-4a10.019,10.019,0,0,1,6-9.168v-.153A10.019,10.019,0,0,1,6,7V3A1,1,0,0,1,7,2H25a1,1,0,0,1,1,1V7A10.021,10.021,0,0,1,20,16.168Z"></path>
      </g>
    </GlassContainer>
  );
}

export default function TopicTime({
  total,
  actual,
  label,
  percentFull,
  strokeColor,
  fillColor,
  numberOfHourGlasses,
  size = "md",
  showTime = true,
}) {
  const [fillPercent, setFillPercent] = useState(
    percentFull
      ? `${percentFull}%`
      : actual === undefined
      ? "100%"
      : 100 - (actual / total) * 100 + "%"
  );
  const [color, setColor] = useState({
    stroke: strokeColor || "#09a709",
    fill: fillColor || "#09a709",
  });
  const [numGlasses, setNumGlasses] = useState(numberOfHourGlasses || 1);

  useEffect(() => {
    if (actual === undefined) return setNumGlasses(numberOfHourGlasses || 1);
    let tMins = total - actual;
    tMins = tMins < 0 ? Math.abs(tMins) : tMins;
    let numGlasses = numberOfHourGlasses || Math.floor(tMins / total) || 1;
    if (tMins / total - 1 > 0) numGlasses += 1;
    let remainingMins = tMins % total;
    let p = !!remainingMins ? (remainingMins / total) * 100 + "%" : "100%";
    if (remainingMins === 0 && p === "100%" && numGlasses > 1) numGlasses -= 1;

    setNumGlasses(numGlasses);
    setFillPercent(percentFull ? `${percentFull}%` : p);
  }, [actual, percentFull, numberOfHourGlasses]);

  useEffect(() => {
    let p = parseFloat(fillPercent.replace("%", ""));
    if (!!actual && total - actual < 0) {
      setColor({
        stroke: strokeColor || "red",
        fill: fillColor || "red",
      });
    } else if (p < 10 || total - actual === 0) {
      setColor({
        stroke: strokeColor || "orange",
        fill: fillColor || "orange",
      });
    } else {
      setColor({
        stroke: strokeColor || "#09a709",
        fill: fillColor || "#09a709",
      });
    }
  }, [actual, fillPercent, fillColor, strokeColor]);

  return (
    <Container preserveAspectRatio="none" size={size}>
      <Column multiple={numGlasses > 1}>
        <Icons multiple={numGlasses > 1}>
          {[...Array(numGlasses)].map((_, i, { length }) => {
            if (i + 1 < length) {
              return (
                <Glass
                  key={i}
                  glassNum={i + 1}
                  stroke={color.stroke}
                  fill={color.fill}
                  percent="100%"
                />
              );
            }

            return (
              <Glass
                key={i}
                glassNum={i + 1}
                stroke={color.stroke}
                fill={color.fill}
                percent={fillPercent}
              />
            );
          })}
        </Icons>
        {showTime && (
          <TimeText color={color.stroke}>
            {label
              ? label
              : actual === undefined
              ? makeReadableTime(round(total))
              : makeReadableTime(round(total - actual)).replace("-", "")}
          </TimeText>
        )}
      </Column>
    </Container>
  );
}

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  transform: scale(0.7);
`;

const Column = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.multiple ? "column" : "row")};
  align-items: center;
  justify-content: center;
`;

const TimeText = styled.span`
  color: ${(props) => props.color};
  font-family: ${fonts.subtitle};
  font-size: 1.25em;
  font-weight: bold;
`;

const GlassContainer = styled.svg`
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
