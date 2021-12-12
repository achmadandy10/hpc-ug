import styled from "styled-components";

export const DashboardInfoContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 20px;
    width: 100%;

    @media only Screen and (max-width: 500px) {
        display: flex;
        flex-direction: column
    }
`