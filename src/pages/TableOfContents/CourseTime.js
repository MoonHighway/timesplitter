import styled from "styled-components";

export default function CourseTime() {
  return (
    <Container>
      <p>Course Time: 3hr 30min</p>
      <p>Course Ends At: 5:00pm</p>
      <button>start</button>
    </Container>
  );
}

const Container = styled.div`
  padding: 1em;
`;
