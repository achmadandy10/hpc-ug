import { Link } from "react-router-dom";
import styled from "styled-components";

export const VerifyContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
`

export const VerifyImg = styled.img`
    width: 70px;
    height: 70px;
`

export const VerifyContent = styled.div`
    background: var(--body-color);
    box-shadow: var(--bs-smooth);
    padding: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 3px;

    @media only Screen and (max-width: 768px) {
        padding: 20px;
    }
`

export const VerifySuccess = styled.span`
    color: var(--success-color);
    background: #c3ffc2;
    font-size: var(--h3-font-size);
    border-radius: 3px;
    padding: 20px;
    margin-bottom: 20px;
`

export const VerifyDanger = styled.span`
    color: var(--danger-color);
    background: #FFC2C2;
    font-size: var(--h3-font-size);
    border-radius: 3px;
    padding: 20px;
    margin-bottom: 20px;
`

export const VerifyTitle = styled.h2`
    font-size: var(--h1-font-size);
    font-weight: var(--font-semi-bold);
    color: var(--title-color);
`

export const VerifyError = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #ffb8b1;
    border-radius: 3px;
    padding: 7px 14px;
    color: var(--danger-color);
`

export const VerifyForm = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
`

export const VerifyButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-direction: column;
`

export const VerifyButtonLink = styled(Link)`
    margin-top: 10px;
    width: 100%;
    color: var(--text-color);
    transition: .3s;

    &:hover {
        color: var(--first-color);
    }
`
