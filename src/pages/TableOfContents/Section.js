import { fonts, colors } from "../../theme";
import { Link } from "react-router-dom";
import { Timer, TopicIcon, SubTitle, Row, Column } from "../../ui";
import { totalTime, urlFriendly } from "../../lib";
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
            <Item key={urlFriendly(topic.title)}>
              {time ? <span>{time} mins</span> : null}
              <TopicIcon size={20} type={topic.type} />
              <Link
                to={`/agenda/${urlFriendly(section.title)}/${urlFriendly(
                  topic.title
                )}`}
              >
                {topic.title}
              </Link>
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
  margin-left: 3em;
  font-family: ${fonts.subtitle};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  svg {
    color; ${colors.primary};
    fill: ${colors.primary};
    path {
      stroke: ${colors.primary};
    }
  }

  > a {
    flex: 1;
    color: ${colors.dark};
    text-decoration: none;
    padding-left: 1em;
  }
`;
