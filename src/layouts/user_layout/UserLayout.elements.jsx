import styled from "styled-components";

export const UserLayoutContainer = styled.div`
    background-color: #FFFFFF;
`

export const UserLayoutMain = styled.main`
    display: flex;
    gap: 20px;
`

export const UserLayoutSidebar = styled.div`
    flex: 1;
    height: calc(100vh - 70px);
    background: #FFFFFF;
    position: sticky;
    top: 70px;

    @media only Screen and (max-width: 500px) {
        position: fixed;
        left: -100%;
        transition: .3s ease;
        z-index: 900;
        height: calc(100vh - 50px);
        top: 50px;

        &.show {
            left: 0;
            padding-right: 20px;
            box-shadow: var(--bs-smooth);
        }
    }
`

export const UserLayoutPage = styled.div`
    flex: 4;
    padding: 20px 20px 20px 0;

    @media only Screen and (max-width: 500px) {
        padding-left: 20px;
    }
`