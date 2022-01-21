import { round } from "../../lib";
import styled from "styled-components";

export default function TopicTime({ length, est }) {
  return (
    <Container>
      <Glass
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        x="0px"
        y="0px"
      >
        <title>user solid</title>
        <g data-name="Layer 51">
          <path d="M20,16.168v.152a10.019,10.019,0,0,1,6,9.168v4a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1v-4a10.019,10.019,0,0,1,6-9.168v-.153A10.019,10.019,0,0,1,6,7V3A1,1,0,0,1,7,2H25a1,1,0,0,1,1,1V7A10.021,10.021,0,0,1,20,16.168Z"></path>
        </g>
      </Glass>
      <span>{round(length || est, 1)} min</span>
    </Container>
  );
}

const Glass = styled.svg`
  width: 4.2em;
  fill: green;
`;

const Container = styled.span`
  grid-area: 1 / 6 / 2 / 7;
  background-color: orange;
  display: flex;
  justify-content: center;
  align-items: center;
`;
