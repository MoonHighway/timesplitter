import { useTimesplitter } from "../useTimesplitter";
import styled from "styled-components";

export function StartButton({ disabled = false, ...props }) {
  const { preview } = useTimesplitter();
  return (
    <Container {...props} className="btn-start">
      {preview && <button disabled={disabled}>start</button>}
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
  padding: 1em;
  position: ${(props) => (props.mode === "float" ? "fixed" : "")};
`;
