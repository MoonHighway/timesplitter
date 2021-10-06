import { createGlobalStyle } from "styled-components";
import ynk from "./fonts/YanoneKaffeesatz-Regular.ttf";
import exo from "./fonts/Exo-Regular.ttf";
import pts from "./fonts/PontanoSans-Regular.ttf";
import grace from "./fonts/CoveredByYourGrace-Regular.ttf";

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  h1, h2, h3, h4, h5, p, td, th {
    margin: 0;
    padding: 0;
  }
  #root {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }

  @font-face {
    font-family: "Yanone Kaffeesatz";
    src: local('CoveredByYourGrace'), url(${ynk}) format('truetype');
  }
  @font-face {
    font-family: "Exo";
    src: local('CoveredByYourGrace'), url(${exo}) format('truetype');
  }
  @font-face {
    font-family: "Pontano Sans";
    src: local('CoveredByYourGrace'), url(${pts}) format('truetype');
  }
  @font-face {
    font-family: 'CoveredByYourGrace';
    font-weight: 900;
    src: local('CoveredByYourGrace'), url(${grace}) format('truetype');
  }

  code:not([data-language]) {
    color: white;
  }
`;

export const fonts = {
  title: "Yanone Kaffeesatz",
  subtitle: "Exo",
  text: "Pontano Sans",
  handwriting: "CoveredByYourGrace",
};

export const colors = {
  primary: "#2B558C",
  primaryLight: "#3370A6",
  secondary: "#8BBBD9",
  contrast: "#BF8641",
  contrastLight: "#F2C777",
  dark: "#323A40",
  light: "#B5D2E8",
  bland: "#97AFC2",
  darkbland: "#798D9C",
  darkhard: "#313236",
  highlight: "#4DFFA7",
  notRequired: "#ABABAB",
  meta: "lightblue",
  sample: "#e6e1ad",
  lab: "#ade6bb",
  exercise: "#daade6",
  slides: "#f53b3b",
  noTopic: "#adb2e5",
  beginner: "#32CD32",
  intermediate: "#6c6cfd",
  required: "#d25d5d",
};

export const getTypeColor = ({ type, required = false }) => {
  console.log("called: ", type, !required);
  return !required
    ? colors.notRequired
    : type === "section" || type === "meta"
    ? colors.meta
    : type === "exercise"
    ? colors.exercise
    : type === "lab" || type === "course-lab"
    ? colors.lab
    : type === "slides"
    ? colors.slides
    : type === "sample"
    ? colors.sample
    : colors.noTopic;
};
