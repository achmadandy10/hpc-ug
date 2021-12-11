import { PageContainer, PageHeaderContainer, PageTitle } from "./PageLayout.elements"

export const PageHeader = ({ title, children }) => {
    return (
        <PageHeaderContainer>
            <PageTitle>{ title }</PageTitle>
            { children }
        </PageHeaderContainer>
    )
}

const PageLayout = ({ children }) => {
    return (
        <PageContainer>
            { children }
        </PageContainer>
    )
}

export default PageLayout