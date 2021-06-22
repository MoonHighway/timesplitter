import { useState, useEffect } from "react";
import { urlFriendly } from "../lib";
import styled from "styled-components";
import { Error } from "./Error";
import { fonts } from "../theme";

//
// TODO: Add titles and text
//
//   [ ] Checklist component title
//   [ ] Checklist component text
//   [ ] Finalize Checklist Markdown
//
//   [ ] Error title
//   [ ] Warning title
//   [ ] Success title
//   [ ] Homework title
//   [ ] Info title
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
//  [ ] Is there a workaround
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
      checked: false,
    }));
  } catch (error) {
    return null;
  }
}

const getKey = (title) =>
  window.location.href.replace(
    `${window.location.protocol}//${window.location.host}/`,
    ""
  ) + `/${urlFriendly(title)}`;

export const Checklist = ({ title = "untitled list", children }) => {
  const [listItems, setListItems] = useState(initList(children));

  useEffect(() => {
    if (!children) return null;
    setListItems(initList(children));
  }, [children]);

  useEffect(() => {
    if (sessionStorage[getKey(title)]) {
      console.log("loading list from sessionStorage");
      const list = JSON.parse(sessionStorage[getKey(title)]);
      setListItems(list);
    }
  }, []);

  const itemChecked = (text, checked) => {
    const newList = listItems.map((item) => {
      if (item.text === text) return { ...item, checked };
      return item;
    });
    sessionStorage.setItem(getKey(title), JSON.stringify(newList));
    setListItems(newList);
  };

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
