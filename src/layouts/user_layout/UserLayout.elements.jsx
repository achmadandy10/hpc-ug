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
`

export const UserLayoutPage = styled.div`
    flex: 4;
    padding: 20px 20px 20px 0;
`