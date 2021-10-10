import CourseTitle from "./CourseTitle";
import Section from "./Section";
import { urlFriendly } from "../../lib";
import { useTimesplitter } from "../../useTimesplitter";

export default function TOC() {
  const { agenda } = useTimesplitter();
  if (agenda)
    return (
      <section>
        <CourseTitle />
        {agenda.map((section, i) => (
          <Section key={urlFriendly(section.title)} section={section} />
        ))}
      </section>
    );

  return null;
}
