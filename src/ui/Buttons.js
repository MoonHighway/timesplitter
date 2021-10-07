import { useTimesplitter } from "../useTimesplitter";
import styled from "styled-components";

export function StartButton({ disabled = false, ...props }) {
  const { preview } = useTimesplitter();
  return (
    <Container {...props} className="btn-start">
      {preview && <button disabled={disabled}>start course</button>}
    </Container>
  );
}
export function EndButton({ disabled = false, ...props }) {
  return (
    <Container {...props} className="btn-end">
      <button disabled={disabled}>end</button>
    </Container>
  );
}

const Container = styled.div`
  position: ${(props) => (props.mode === "float" ? "fixed" : "")};
  padding-top: 1em;
  button {
    cursor: pointer;
    font-size: 2em;
    padding: 1em;
    min-width: 300px;
    border: solid 3px #074d07;
    border-radius: 20px;
    background-color: #40f640;
    color: #074d07;
    &:hover {
      background-color: yellow;
    }
  }
`;
