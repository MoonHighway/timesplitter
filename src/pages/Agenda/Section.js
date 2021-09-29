import styled from "styled-components";
import { colors, fonts } from "../../theme";

export default function Section({ title }) {

    return <Container>
        <h1>{title}</h1>
    </Container>

}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.meta};

`