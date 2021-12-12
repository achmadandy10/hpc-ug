import { CardContainer, CardHeaderContainer, CardInfoContainer, CardInfoDataContainer, CardInfoDataCount, CardInfoDataTitle, CardInfoIconContainer, CardTitle } from "./Card.elements"

export const CardInfo = ({ icon, title, count, type }) => {
    return (
        <Card>
            <CardInfoContainer>
                <CardInfoIconContainer type={ type }>
                    { icon }
                </CardInfoIconContainer>
                <CardInfoDataContainer>
                    <CardInfoDataTitle>{ title }</CardInfoDataTitle>
                    <CardInfoDataCount>{ count }</CardInfoDataCount>
                </CardInfoDataContainer>
            </CardInfoContainer>
        </Card>
    )
}

export const CardHeader = ({ title, children }) => {
    return (
        <CardHeaderContainer>
            <CardTitle>{ title }</CardTitle>
            { children }
        </CardHeaderContainer>
    )
}

const Card = ({ children }) => {
    return (
        <CardContainer>
            { children }
        </CardContainer>
    )
}

export default Card