import styled from "styled-components";

export default function CourseProgressBar() {
  return (
    <Container onClick={(e) => (window.location = "/")}>
      <Section />
      <TopicIndicator />
      <TopicIndicator />
      <TopicIndicator />
      <TopicIndicator />
      <TopicIndicator />
      <Section />
      <TopicIndicator />
      <TopicIndicator />
      <TopicIndicator />
      <TopicIndicator />
      <TopicIndicator />
      <TopicIndicator />
      <TopicIndicator />
      <Section />
      <TopicIndicator />
      <TopicIndicator />
      <TopicIndicator />
      <Section />
      <TopicIndicator />
      <TopicIndicator />
      <TopicIndicator />
      <Section />
      <TopicIndicator />
      <TopicIndicator />
      <TopicIndicator />
      <TopicIndicator />
      <TopicIndicator />
      <Section />
      <TopicIndicator />
      <TopicIndicator />
      <TopicIndicator />
      <TopicIndicator />
      <TopicIndicator />
      <Section />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Section = styled.div`
  height: 20px;
  border-left: solid 3px grey;
  margin: 0 5px;
`;

const TopicIndicator = styled.div`
  height: 10px;
  width: 10px;
  border: solid 3px #ababab;
  border-radius: 2px;
  margin: 0 5px;
`;
