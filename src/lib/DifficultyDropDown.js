import { useState, useEffect } from "react";
import { GreenCircle, BlueSquare, BlackDiamond, DoubleDiamond } from ".";
import { fonts } from "../theme";
import Select from "react-select";
import styled from "styled-components";

function useDifficultyOptions(value, size = "sm") {
  const [selected, setSelected] = useState();
  const options = [
    {
      value: "beginner",
      label:
        size === "sm" ? (
          <GreenCircle />
        ) : (
          <>
            <GreenCircle />
            <span className="text">beginner</span>
          </>
        ),
    },
    {
      value: "intermediate",
      label:
        size === "sm" ? (
          <BlueSquare />
        ) : (
          <>
            <BlueSquare />
            <span className="text">intermediate</span>
          </>
        ),
    },
    {
      value: "advanced",
      label:
        size === "sm" ? (
          <BlackDiamond />
        ) : (
          <>
            <BlackDiamond />
            <span className="text">advanced</span>
          </>
        ),
    },
    {
      value: "expert",
      label:
        size === "sm" ? (
          <DoubleDiamond />
        ) : (
          <>
            <DoubleDiamond />
            <span>expert</span>
          </>
        ),
    },
  ];

  useEffect(() => {
    if (!value) return;
    setSelected(options.find((item) => item.value === value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return {
    selected,
    options,
    setDifficulty: (value) =>
      setSelected(options.find((item) => item.value === value)),
  };
}

export function DifficultyDropDown({
  selectedValue = "beginner",
  size = "sm",
  onChange = (f) => f,
}) {
  const { selected, options, setDifficulty } = useDifficultyOptions(
    selectedValue,
    size
  );

  useEffect(() => {
    setDifficulty(selectedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  return (
    <Container size={size} className="difficulty-drop-down">
      <Select
        value={selected}
        options={options}
        onChange={({ value }) => {
          onChange(value);
          setDifficulty(value);
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  margin: 5px;

  font-family: ${fonts.subtitle};
  font-size: 1.2em;

  > div:first-child {
    width: ${(props) => (props.size === "sm" ? "100px" : "250px")};
  }

  div[class$="control"],
  div[class$="ValueContainer"],
  div[class$="IndicatorsContainer"] {
    display: flex;
    align-items: center;
    font-weight: bold;
    svg:last-of-type {
      margin-right: 10px;
    }
    .text {
      position: relative;
      top: -5px;
    }
  }

  div[class$="menu"] {
    svg:last-of-type {
      margin-right: 20px;
    }
    span {
      position: relative;
      top: -5px;
    }
  }

  .prefix__input {
    color: transparent;
  }
`;
