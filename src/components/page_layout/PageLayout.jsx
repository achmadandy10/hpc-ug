import { PageContainer, PageHeaderContainer, PageHeaderFeature, PageTitle } from "./PageLayout.elements"

export const PageHeader = ({ title, children }) => {
    return (
        <PageHeaderContainer>
            <PageTitle>{ title }</PageTitle>
            <PageHeaderFeature>
                { children }
            </PageHeaderFeature>
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