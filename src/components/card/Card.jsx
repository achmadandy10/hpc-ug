import { CardContainer, CardHeaderContainer, CardTitle } from "./Card.elements"

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