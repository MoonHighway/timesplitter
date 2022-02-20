import { fonts, colors, getTypeColor } from "../../theme";
import { Link } from "react-router-dom";
import {
  Timer,
  TopicIcon,
  SubTitle,
  Row,
  Column,
  AdjustedTimeIndicator,
} from "../../ui";
import { totalTime, urlFriendly, Difficulty, TimeDisplay } from "../../lib";
import styled from "styled-components";
import { format } from "date-fns";

const formatTimeDisplay = (topic) =>
  topic.time
    ? format(new Date(topic.time.startsAt), "h:mm aa")
    : totalTime(topic) + " mins";

export default function Section({ section }) {
  const time = formatTimeDisplay(section);
  const startSection = () => {
    window.location = `/agenda/${urlFriendly(section.title)}`;
  };

  return (
    <Container>
      <Row className="timer-row">
        <Timer size={30} className="section-clock" />
        <SubTitle className="section-time">{time}</SubTitle>
        <SubTitle className="section-title" onClick={startSection}>
          {section.title} &nbsp;
        </SubTitle>
        {section.time && (
          <>
            (<TimeDisplay time={section.time.est} short={true} />)
            <AdjustedTimeIndicator
              adjusted={section.agenda.reduce(
                (total, topic) => total + (topic.adjusted || 0),
                0
              )}
            />
          </>
        )}
      </Row>
      <Column>
        {section.agenda.map((topic) => {
          const time = formatTimeDisplay(topic);
          if (topic.type === "meta") {
            return (
              <Item key={urlFriendly(topic.title)} type={topic.type}>
                <Row className="topic-row">
                  <Link
                    to={`/agenda/${urlFriendly(section.title)}/${urlFriendly(
                      topic.title
                    )}`}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TopicIcon
                      className="topic-type"
                      size={30}
                      type={topic.type}
                    />
                    <span>{topic.title}</span>
                  </Link>
                </Row>
              </Item>
            );
          }
          return (
            <Item key={urlFriendly(topic.title)} type={topic.type}>
              <span className="time">{time}</span>
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
                  <AdjustedTimeIndicator adjusted={topic.adjusted} />
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

  svg:first-of-type,
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
    height: 35px;

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
