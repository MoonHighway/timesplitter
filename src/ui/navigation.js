import { useHistory } from "react-router-dom";
import { BiSkipPreviousCircle, BiSkipNextCircle } from "react-icons/bi";
import styled from "styled-components";

export const NavigationBar = ({
  prev,
  next,
  onPrev = (f) => f,
  onNext = (f) => f,
}) => {
  const history = useHistory();

  const p = prev.to ? () => history.push(prev.to) : onPrev;
  const n = next.to ? () => history.push(next.to) : onNext;

  return (
    <Container>
      <Button onClick={p}>
        <BiSkipPreviousCircle size={42} />
        <button>{prev.text}</button>
      </Button>
      <Button onClick={n}>
        <button>{next.text}</button>
        <BiSkipNextCircle size={42} />
      </Button>
    </Container>
  );
};

const Button = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: white;
  opacity: 0.7;
`;

const Container = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: fixed;
  bottom: 0;
  left: 0;

  button {
    cursor: pointer;
    background: none;
    border: none;
    position: relative;
    text-decoration: none;
    margin: 0.25em;
    font-size: 1.25em;
  }
`;
