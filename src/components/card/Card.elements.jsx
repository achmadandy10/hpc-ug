import styled from "styled-components";

export const CardContainer = styled.div`
    background: var(--container-color);
    box-shadow: var(--bs-smooth);
    padding: 20px;
    border-radius: 3px;

`

export const CardTitle = styled.h2`
    font-size: var(--h3-font-size);
    font-weight: var(--font-medium);
    color: var(--title-color);
`

export const CardHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;    
    margin-bottom: 20px;
`