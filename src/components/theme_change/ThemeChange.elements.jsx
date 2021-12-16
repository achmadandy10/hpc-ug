import styled from "styled-components";

export const ThemeChangeContainer = styled.div`
    position: fixed;
    right: 20px;
    bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
`

export const ThemeChangeContent = styled.div`
    padding: 1px;
    border-radius: 50%;
    font-size: var(--h2-font-size);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .3s;
    border: 2px solid transparent;

    & svg.blue {
        color: #215C91;
    }
    
    & svg.purple {
        color: #5B3A89;
    }

    &.active {
        border: 2px solid var(--title-color);
    }
`