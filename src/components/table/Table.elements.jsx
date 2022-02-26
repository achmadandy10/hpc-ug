import styled from "styled-components"

export const TableContainer = styled.div`
    height: 430px;
    width: 100%;
`

export const TableActionContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
`

export const TableStatusContainer = styled.label`
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 100px;
    ${({ status }) => {
        if (status === "Approved" || status === 'active') {
            return `
                color: var(--success-color);
                background: #c3ffc2;
            `
        } else if (status === "Rejected") {
            return `
                color: var(--danger-color);
                background: #ffb8b1;
            `
        } else if (status === "Pending") {
            return `
                color: var(--warning-color);
                background: #ffdbb5;
            `
        } else if (status === "Finished") {
            return `
                color: var(--first-color);
                background: #d3b4ff;
            `
        }
    }}
`