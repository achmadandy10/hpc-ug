import { TopbarContainer, TopbarFeauture, TopbarIconBag, TopbarIconContainer, TopbarLeft, TopbarLogoContainer, TopbarLogoImg, TopbarLogoTitle, TopbarProfile, TopbarProfileImg, TopbarProfileName, TopbarRight, TopbarWrapper } from "./Topbar.elements"
import Logo from "../../images/logo.png"
import { FaBell, FaChevronDown } from "react-icons/fa"

const Topbar = () => {
    return (
        <TopbarContainer>
            <TopbarWrapper>
                <TopbarLeft>
                    <TopbarLogoContainer>
                        <TopbarLogoImg src={ Logo }/>
                        <TopbarLogoTitle>HPC UG</TopbarLogoTitle>
                    </TopbarLogoContainer>
                </TopbarLeft>

                <TopbarRight>
                    <TopbarFeauture>
                        <TopbarIconContainer>
                            <FaBell/>
                            <TopbarIconBag>+9</TopbarIconBag>
                        </TopbarIconContainer>
                    </TopbarFeauture>

                    <TopbarProfile>
                        <TopbarProfileName>Achmad Andy</TopbarProfileName>
                        <TopbarProfileImg src="https://ui-avatars.com/api/?name=Achmad+Andybackground=0D8ABC&color=fff"/>
                        <FaChevronDown/>
                    </TopbarProfile>
                </TopbarRight>
            </TopbarWrapper>
        </TopbarContainer>
    )
}

export default Topbar