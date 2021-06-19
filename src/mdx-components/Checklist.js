import { useState, useEffect } from "react";
import styled from "styled-components";
import { Error } from "./Error";
import { fonts } from "../theme";

//
//  TODO: Complete Checkbox Component
//
//  [x] split * or - lists
//  [x] test with space around markdown
//  [x] List Checkboxes
//  [ ] (Find,Create) Checkbox component
//      [ ] Checklist Background and Icon
//      [ ] Larger Checklist Text
//      [ ] Grey out and strike-through completed items
//      [ ] Use Cool check icon fo checkbox
//  [ ] Save Data
//      [ ] Saved Checked items to session
//      [ ] Make sure checkboxes are reset after session
//

//
//  TODO: Complete Question component
//
//  [ ] Setup Markdown
//  [ ] Question Color
//  [ ] Question Icon
//  [ ] Q&A Solution
//

//
//  TODO: Publish
//
//  [ ] Research Line Number Data to Code Block problem
//  [ ] Is there a Fix
//  [ ] Test All
//  [ ] Publish New Timesplitter
//

export const CheckBox = ({ checked = false, children }) => {
  const [isChecked, setChecked] = useState(checked);

  useEffect(() => {
    if (isChecked !== checked) setChecked(checked);
  }, [checked]);

  return (
    <CheckRow>
      <input
        type="checkbox"
        value={isChecked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <span>{children}</span>
    </CheckRow>
  );
};

export const Checklist = ({ children }) => {
  let listItems;

  try {
    listItems = children.props.children.map((c) => c.props.children);
  } catch (error) {
    return (
      <Error>
        Checklist Error, something is wrong with the markdown content for this
        Checklist.
      </Error>
    );
  }

  return (
    <Container>
      {listItems.map((item, i) => (
        <CheckBox key={i}>{item}</CheckBox>
      ))}
    </Container>
  );
};

const CheckRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${fonts.subtitle};
  h1 {
    font-family: ${fonts.title};
  }
  width: 500px;
  min-width: 500px;
  padding: 1em;
  background-color: #00800017;
  color: green;
  border: solid 1px green;
  border-left: solid 5px green;
  margin: 1em;

  svg {
    flex-shrink: 0;
  }
  span {
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;
