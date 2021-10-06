import styled from "styled-components";
import { Link } from "react-router-dom";
import { GrOverview } from "react-icons/gr";
import { format } from "date-fns";
import { Title, Text, Row } from "../../ui";
import { useTimesplitter } from "../../useTimesplitter";

export default function CourseTitle() {
  const { title } = useTimesplitter();
  return (
    <Layout>
      <Row>
        <Link to="/overview">
          <GrOverview size={50} color="black" />
        </Link>
        <Title>{title}</Title>
      </Row>
      <Text className="date">
        {format(new Date(), "eeee MMMM do yyyy - hh:mmaaa ")}
      </Text>
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
