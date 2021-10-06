import { fonts, colors, getTypeColor } from "../../theme";
import { Link } from "react-router-dom";
import { Timer, TopicIcon, SubTitle, Row, Column } from "../../ui";
import { totalTime, urlFriendly, Difficulty } from "../../lib";
import styled from "styled-components";

export default function Section({ section }) {
  const time = totalTime(section);
  const startSection = () => {
    window.location = `/agenda/${urlFriendly(section.title)}`;
  };

  return (
    <Container>
      <Row className="timer-row">
        <Timer size={30} />
        <SubTitle className="section-time">{time} mins</SubTitle>
        <SubTitle className="section-title" onClick={startSection}>
          {section.title}
        </SubTitle>
      </Row>
      <Column>
        {section.agenda.map((topic, i) => {
          const time = totalTime(topic);
          return (
            <Item key={urlFriendly(topic.title)} type={topic.type}>
              {time ? <span className="time">{time} mins</span> : null}
              <Row className="topic-row">
                <TopicIcon className="topic-type" size={30} type={topic.type} />
                <Difficulty
                  className="topic-difficulty"
                  level={topic.difficulty}
                />
                <Link
                  to={`/agenda/${urlFriendly(section.title)}/${urlFriendly(
                    topic.title
                  )}`}
                >
                  {topic.title}
                </Link>
              </Row>
            </Item>
          );
        })}
      </Column>
    </Container>
  );
}

const Container = styled.section`
  margin: 1em;
  margin-left: 2em;

  .timer-row {
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: yellow;
    }
  }

  svg,
  .section-time {
    margin-right: 1em;
  }

  .section-title {
    &:before {
      content: "-";
      margin-right: 1em;
    }
  }
`;

const Item = styled.div`
  cursor: pointer;
  margin-left: 3em;
  font-family: ${fonts.subtitle};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 3px;

  &:hover {
    background-color: yellow;
    border-radius: 10px 0 0 10px;
  }

  span.time {
    flex-basis: 86px;
    text-align: right;
  }

  svg.topic-type {
    fill: ${(props) => {
      return getTypeColor({ type: props.type, required: true });
    }};
    path {
      stroke: ${(props) => getTypeColor({ type: props.type, required: true })};
    }
  }

  svg.topic-difficulty {
    &:last-of-type {
      left: -20px;
    }
  }

  > div.topic-row {
    flex-grow: 1;
    margin-left: 60px;
    align-items: center;
    position: relative;

    > a {
      flex: 1;
      color: ${colors.dark};
      text-decoration: none;
      padding-left: 1em;
      position: absolute;
      left: 70px;
    }
  }
`;
