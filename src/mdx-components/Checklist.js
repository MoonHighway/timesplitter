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
//  [x] (Find,Create) Checkbox component
//      [x] Checklist Background and Icon
//      [x] Larger Checklist Text
//      [x] Grey out and strike-through completed items
//      [x] Use Cool check icon fo checkbox
//  [ ] Save Data
//      [x] Saved Checked items to session
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

export const CheckBox = ({
  checked = false,
  children,
  onChange = (f) => f,
  ...props
}) => {
  return (
    <CheckRow>
      <Check
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(children, e.target.checked)}
        {...props}
      />
      <Text checked={checked}>{children}</Text>
    </CheckRow>
  );
};

function initList(children) {
  try {
    return children.props.children.map((c) => ({
      text: c.props.children,
      checked: true,
    }));
  } catch (error) {
    return null;
  }
}

export const Checklist = ({ children }) => {
  const [listItems, setListItems] = useState(initList(children));

  useEffect(() => {
    if (!children) return null;
    setListItems(initList(children));
  }, [children]);

  const itemChecked = (text, checked) => {
    setListItems(
      listItems.map((item) => {
        if (item.text === text) return { ...item, checked };
        return item;
      })
    );
  };

  console.log(listItems);

  if (!listItems)
    return (
      <Error>
        Checklist Error, something is wrong with the markdown content for this
        Checklist.
      </Error>
    );

  return (
    <Container>
      {listItems.map(({ text, checked }, i) => (
        <CheckBox key={i} checked={checked} onChange={itemChecked}>
          {text}
        </CheckBox>
      ))}
    </Container>
  );
};

const Text = styled.span`
  font-size: 1.5em;

  color: ${(props) => (props.checked ? "grey" : "inherit")};
  text-decoration: ${(props) => (props.checked ? "line-through" : "none")};
`;

const Check = styled.input`
  width: 35px;
  height: 35px;
`;

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
  background-color: #00809b14;
  color: #00809b;
  border: solid 1px #00809b;
  border-left: solid 5px #00809b;
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
