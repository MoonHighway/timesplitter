import { MdTimer } from "react-icons/md";
import { RiSlideshowFill } from "react-icons/ri";
import { GrWorkshop } from "react-icons/gr";
import { ImLab } from "react-icons/im";
import { FaCode, FaUserGraduate } from "react-icons/fa";
import { colors } from "../theme";
import { Row } from "./layout";

export const TopicIcon = ({ type, ...props }) =>
  type === "sample" ? (
    <Sample {...props} />
  ) : type === "lab" ? (
    <Lab {...props} />
  ) : type === "course-lab" ? (
    <CourseLab {...props} />
  ) : type === "exercise" ? (
    <Exercise />
  ) : (
    <Slides />
  );

export const CircleLink = ({ Icon, children }) => (
  <Row>
    <Icon />
    <span>{children}</span>
  </Row>
);

export const Timer = ({ color = "#898989", size = 25, ...props }) => (
  <MdTimer size={size} color={color} {...props} />
);

export const Slides = ({ color = colors.primary, size = 25, ...props }) => (
  <RiSlideshowFill size={size} color={color} {...props} />
);

export const Sample = ({ color = "#898989", size = 25, ...props }) => (
  <GrWorkshop size={size} color={color} {...props} />
);

export const Lab = ({ color = "#898989", size = 25, ...props }) => (
  <ImLab size={size} color={color} {...props} />
);

export const Exercise = ({ color = "#898989", size = 25, ...props }) => (
  <FaCode size={size} color={color} {...props} />
);

export const CourseLab = ({ color = "#898989", size = 25, ...props }) => (
  <FaUserGraduate size={size} color={color} {...props} />
);
