import styled from "styled-components";

export const ProposalEditFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

export const ProposalEditFormButton = styled.div`
    margin-top: 20px;
`

export const ProposalEditRevDesc = styled.div`
    background: #FFFFFF;
    padding: 20px;
    border: 2px solid var(--warning-color);
    border-radius: 3px;
    margin-bottom: 20px;

    strong {
        color: var(--warning-color);
    }
`