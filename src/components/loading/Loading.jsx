import Loader from "react-loader-spinner"
import { LoadingPageContainer } from "./Loading.elements"

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