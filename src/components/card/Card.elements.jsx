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

export const CardInfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
`

export const CardInfoIconContainer = styled.div`
    ${({ type }) => {
        if (type === "success") {
            return `color: var(--success-color);`
        } else if (type === "danger") {
            return `color: var(--danger-color);`
        } else if (type === "warning") {
            return `color: var(--warning-color);`
        } else if (type === "info") {
            return `color: var(--info-color);`
        } else if (type === "primary") {
            return `color: var(--first-color);`
        }
    }}

    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--h1-font-size);
`

export const CardInfoDataContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const CardInfoDataTitle = styled.span`
    font-size: var(--h3-font-size);
    font-weight: 600;
`

export const CardInfoDataCount = styled.span`
    font-size: var(--normal-font-size);
    font-weight: 300;
`