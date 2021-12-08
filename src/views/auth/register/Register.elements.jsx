import styled from "styled-components";

export const RegisterContainer = styled.div`
    display: grid;
    grid-template-columns: 30% 70%;
    height: 100vh;

    @media only Screen and (max-width: 768px) {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

export const RegisterLeft = styled.div`
    background: var(--first-color);

    @media only Screen and (max-width: 768px) {
        display: none;
    }
`

export const RegisterRight = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
`

export const RegisterContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
`

export const RegisterTitle = styled.h2`
    font-size: var(--h1-font-size);
    font-weight: var(--font-semi-bold);
    color: var(--title-color);
`

export const RegisterForm = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
`

export const RegisterButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`