import { useTimesplitter } from "../useTimesplitter";
import styled from "styled-components";
import { Delete } from "./icons";

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

export function RemoveButton({ disabled = false, ...props }) {
  return (
    <Remove {...props} className="btn-remove">
      <Delete />
    </Remove>
  );
}

const Remove = styled.div`
  cursor: pointer;
  fill: #ffcccc;
  svg:hover {
    fill: red;
  }
`;

export const AdjustButton = styled.button`
cursor: pointer;
font-size: 2em;
padding: .5em;
margin: .5em 0;
min-width: 420px;
className="topic"
border: solid 3px red;
border-radius: 20px;
background-color: #ffcccc;
color: red;
&:hover {
  background-color: yellow;
`;
