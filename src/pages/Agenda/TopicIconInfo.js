import styled from "styled-components";
import { TopicIcon } from "../../lib";
import { getTypeColor } from "../../theme";

export default function TopicIconInfo({ type }) {
  return (
    <Container type={type} required={true}>
      <TopicIcon type={type} size={50} stroke="black" fill="black" />
    </Container>
  );
}

const Container = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: -webkit-linear-gradient(
    138deg,
    #fff 37%,
    ${getTypeColor} 35%
  );

  svg {
    position: relative;
    left: -40px;
  }
`;
