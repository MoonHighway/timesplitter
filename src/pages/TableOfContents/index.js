import styled from "styled-components";
import CourseTime from "./CourseTime";
import ManualAdjust from "../ManualAdjust";
import TOC from "./TOC";

import { useTimesplitter } from "../../useTimesplitter";

export default function TableOfContents() {
  const results = useTimesplitter();
  console.log(results);
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
