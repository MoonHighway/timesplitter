import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavigationBar } from "../../ui";
import { usePresenter } from "../../hooks";
import Section from "./Section";
import Exercise from "./Exercise";
import Lab from "./Lab";
import Step from "./Step";
import Meta from "./Meta";
import Slides from "./Slides";
import Sample from "./Sample";

export default function Agenda() {
  let { pathname } = useLocation();
  const presenter = usePresenter(pathname);
  const [parentType, setParentType] = useState();

  useEffect(() => {
    if (!presenter || !presenter.topic || presenter.topic.type === "step")
      return;

    setParentType(presenter.topic.type);
  });

  if (presenter) {
    const {
      md,
      prev,
      next,
      topic: { title, time, type, required, breadcrumbs },
      prevTopic,
      nextTopic,
    } = presenter;

    const nav = (
      <NavigationBar
        onNext={next}
        onPrev={prev}
        next={{
          to: !nextTopic && "/",
          text: nextTopic ? nextTopic.title : "Contents",
        }}
        prev={{
          to: !prevTopic && "/",
          text: prevTopic ? prevTopic.title : "Contents",
        }}
      />
    );

    if (type === "slides") {
      return (
        <>
          <Slides title={title} time={time} />
          {nav}
        </>
      );
    }

    if (type === "section") {
      return (
        <>
          <Section title={title} time={time} />
          {nav}
        </>
      );
    }

    if (type === "exercise") {
      return (
        <>
          <Exercise title={title} time={time} />
          {nav}
        </>
      );
    }

    if (type === "lab") {
      return (
        <>
          <Lab title={title} time={time} />
          {nav}
        </>
      );
    }

    if (type === "sample") {
      return (
        <>
          <Sample title={title} time={time} />
          {nav}
        </>
      );
    }

    return (
      <Step
        title={title}
        time={time}
        parentType={parentType}
        breadcrumbs={breadcrumbs}
        type={type}
        required={required}
        nav={nav}
        md={md}
      />
    );
  }

  return null;
}
