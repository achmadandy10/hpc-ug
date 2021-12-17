import { ButtonLink } from "../../../components/button/Button"
import { AboutContainer, AboutContent, AboutContentImg, AboutContentItem, AboutContentOverlay, AboutContentTitle, AboutTitle } from "./About.elements"

const About = () => {
    return (
        <AboutContainer>
            <AboutTitle>Tentang</AboutTitle>
            <AboutContent>
                <AboutContentItem>
                    <AboutContentImg src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmovietvtechgeeks.com%2Fwp-content%2Fuploads%2F2015%2F05%2Fmost-common-server-problems.jpg&f=1&nofb=1"/>
                    <AboutContentOverlay>
                        <AboutContentTitle>HPC</AboutContentTitle>
                        <ButtonLink to="/tentang/hpc">Lihat</ButtonLink>
                    </AboutContentOverlay>
                </AboutContentItem>
                <AboutContentItem>
                    <AboutContentImg src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmovietvtechgeeks.com%2Fwp-content%2Fuploads%2F2015%2F05%2Fmost-common-server-problems.jpg&f=1&nofb=1"/>
                    <AboutContentOverlay>
                        <AboutContentTitle>DGX A-100</AboutContentTitle>
                        <ButtonLink to="/tentang/dgx-a-100">Lihat</ButtonLink>
                    </AboutContentOverlay>
                </AboutContentItem>
                <AboutContentItem>
                    <AboutContentImg src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmovietvtechgeeks.com%2Fwp-content%2Fuploads%2F2015%2F05%2Fmost-common-server-problems.jpg&f=1&nofb=1"/>
                    <AboutContentOverlay>
                        <AboutContentTitle>Syarat Penggunaan</AboutContentTitle>
                        <ButtonLink to="/tentang/syarat-penggunaan">Lihat</ButtonLink>
                    </AboutContentOverlay>
                </AboutContentItem>
            </AboutContent>
        </AboutContainer>
    )
}

export default About