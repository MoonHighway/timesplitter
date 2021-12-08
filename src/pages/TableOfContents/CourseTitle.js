import styled from "styled-components";
import { Link } from "react-router-dom";
import { GrOverview } from "react-icons/gr";
import { format } from "date-fns";
import { Title, Text, Row } from "../../ui";
import { useTimesplitter } from "../../useTimesplitter";

export default function CourseTitle() {
  const { courseLength, title, time } = useTimesplitter();
  const courseEnd = time && new Date(time.start + courseLength * 60 * 1000);

  return (
    <Layout>
      <Row>
        <Link to="/overview">
          <GrOverview size={50} color="black" />
        </Link>
        <Title>{title}</Title>
      </Row>
      {time && (
        <Text className="date">
          {format(new Date(time.start), "eeee MMMM do yyyy - h:mmaaa ")}
          {format(new Date(courseEnd), "- h:mmaaa ")}
        </Text>
      )}
    </Layout>
  );
}

const Layout = styled.header`
  display: flex;
  padding: 1em;
  flex-direction: column;
  svg {
    margin-right: 1em;
  }
  .date {
    margin-left: 70px;
    font-size: 1.5em;
  }
`;
