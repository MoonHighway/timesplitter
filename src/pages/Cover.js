import { Link } from "react-router-dom";
import { fonts, colors } from "../theme";
import { TeacherEditionTitle } from "../ui";
import styled from "styled-components";
import JSLogo from "../images/JSLogo.png";
import NodeJSLogo from "../images/NodeJSLogo.png";
import MHLogo from "../images/MHLogo.png";
import { useContent } from "../hooks";

export default function Cover() {
  const content = useContent();

  return (
    <Content>
      <BottomCorner>
        <a href="http://www.moonhighway.com" target="_blank" rel="noreferrer">
          <img src={MHLogo} alt="Moon Highway" />
        </a>
      </BottomCorner>
      <div className="js-logo">
        <img src={JSLogo} alt="JavaScript" />
      </div>
      <div className="node-logo">
        <img src={NodeJSLogo} alt="node js" />
      </div>
      {content && <TeacherEditionTitle title={content.title} />}
      <Start>
        <Link to="/toc">Start</Link>
      </Start>
    </Content>
  );
}

const Start = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  a {
    font-family: ${fonts.title};
    font-size: 2.5em;
    color: ${colors.secondary};
    &:after {
      content: " > ";
    }
    text-decoration: none;
  }

  @media (orientation: landscape) {
    grid-area: 4 / 4 / 4 / 4;
  }
  @media (orientation: portrait) {
    grid-area: 6 / 4 / 7 / 5;
  }
`;

const BottomCorner = styled.div`
  @media (orientation: landscape) {
    grid-area: 5 / 1 / 6 / 2;
  }

  @media (orientation: portrait) {
    grid-area: 10 / 1 / 11 / 2;
  }

  a {
    img {
      width: 150px;
    }
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  img {
    width: 100%;
  }

  .js-logo,
  .node-logo,
  .pp-logo {
    margin: 2px;
    padding: 2px;
  }

  @media (orientation: landscape) {
    grid-template-columns: repeat(3, 1fr) 3fr 1fr;
    grid-template-rows: repeat(5, 1fr);
    .js-logo {
      grid-area: 2 / 2 / 3 / 3;
    }
    .node-logo {
      grid-area: 2 / 3 / 3 / 4;
    }
    .pp-logo {
      grid-area: 3 / 2 / 4 / 3;
    }
  }

  @media (orientation: portrait) {
    grid-template-columns: repeat(3, 1fr) 2fr 1fr;
    grid-template-rows: repeat(10, 1fr);

    .js-logo {
      grid-area: 3 / 2 / 4 / 3;
    }
    .node-logo {
      grid-area: 3 / 3 / 4 / 4;
    }
    .pp-logo {
      grid-area: 4 / 2 / 5 / 3;
    }
  }
`;
