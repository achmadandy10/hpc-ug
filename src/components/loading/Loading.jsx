import Loader from "react-loader-spinner"
import { LoadingPageContainer, LoadingElementContainer } from "./Loading.elements"

export const LoadingElement = () => {
    return (
        <LoadingElementContainer>
            <Loader
                type="TailSpin"
                color="#5B3A89"
                height={50}
                width={50}
            />
        </LoadingElementContainer>
    )
}

const LoadingPage = () => {
    return (
        <LoadingPageContainer>
            <Loader
                type="Puff"
                color="#5B3A89"
                height={100}
                width={100}
            />
        </LoadingPageContainer>
    )
}

export default LoadingPage