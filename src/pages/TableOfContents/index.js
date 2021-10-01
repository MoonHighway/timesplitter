import styled from "styled-components";
import CourseTime from "./CourseTime";

import TOC from "./TOC";

export default function TableOfContents() {
  return (
    <Layout>
      <CourseTime />
      <TOC />
    </Layout>
  );
}

const Layout = styled.section`
  width: 100%;
  display: flex;
  > :nth-child(2) {
    flex-grow: 1;
  }
`;
