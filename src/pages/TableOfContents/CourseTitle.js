import styled from "styled-components";
import { Link } from "react-router-dom";
import { GrOverview } from "react-icons/gr";
import { useTimesplitter } from "../../useTimesplitter";

export default function CourseTitle() {
  const { title } = useTimesplitter();
  return (
    <Layout>
      <Link to="/overview">
        <GrOverview size={50} color="black" />
      </Link>
      <h1>{title}</h1>
    </Layout>
  );
}

const Layout = styled.header`
  display: flex;
  svg {
    padding-top: 20px;
    padding-left: 20px;
  }
  h1 {
    font-size: 3em;
    padding: 20px;
  }
`;
