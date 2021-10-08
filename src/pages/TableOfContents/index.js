import styled from "styled-components";
import CourseTime from "./CourseTime";
import ManualAdjust from "../ManualAdjust";

import TOC from "./TOC";

export default function TableOfContents() {
  return (
    <>
      <ManualAdjust />
      <Layout>
        <CourseTime />
        <TOC />
      </Layout>
    </>
  );
}

const Layout = styled.section`
  width: 100%;
  display: flex;
  > :nth-child(2) {
    flex-grow: 1;
  }
`;
