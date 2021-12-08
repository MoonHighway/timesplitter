import styled from "styled-components";

export * from "./layout";
export * from "./navigation";
export * from "./icons";
export * from "./Text";
export * from "./CodeBlock";
export * from "./Buttons";

export function AdjustedTimeIndicator({ adjusted = 0 }) {
  const lessTime = adjusted && adjusted < 0;
  const onTime = !adjusted || adjusted === 0;

  if (onTime) return null;

  if (lessTime)
    return (
      <Adjusted less={true}>&nbsp; {adjusted && `(${adjusted} min)`}</Adjusted>
    );

  return (
    <Adjusted less={false}>&nbsp; {adjusted && `(+ ${adjusted} min)`}</Adjusted>
  );
}

const Adjusted = styled.span`
  color: ${({ less = false }) => (less ? "red" : "green")};
  font-size: 0.8em;
`;
