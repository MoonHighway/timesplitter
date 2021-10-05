import styled from "styled-components";
import { Link } from "react-router-dom";
import { GrOverview } from "react-icons/gr";
import { Title } from "../../ui";
import { useTimesplitter } from "../../useTimesplitter";

export default function CourseTitle() {
  const { title } = useTimesplitter();
  return (
    <Layout>
      <Link to="/overview">
        <GrOverview size={50} color="black" />
      </Link>
      <Title>{title}</Title>
    </Layout>
  );
}

const Layout = styled.header`
  display: flex;
  padding: 0.5em;

  svg {
    margin-right: 1em;
  }
`;
