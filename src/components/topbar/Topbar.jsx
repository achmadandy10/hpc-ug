import { TopbarContainer, TopbarFeatureArea, TopbarFeatureContainer, TopbarFeautureMenu, TopbarFeautureMenuBadge, TopbarLogo, TopbarMenuButton, TopbarProfileContainer, TopbarProfileDropdownContainer, TopbarProfileDropdownItem, TopbarProfileDropdownItemLogout, TopbarProfileImg, TopbarProfileName, TopbarSearchContainer, TopbarSearchInput } from "./Topbar.elements"
import Logo from "../../images/logo.png"
import { FaBars, FaBell, FaChevronDown, FaSearch, FaSignOutAlt, FaUserCog } from "react-icons/fa"
import { useRef } from "react"

const Topbar = () => {
    const profileRef = useRef(false)

    const profileToggle = () => {
        profileRef.current.classList.toggle("active")
    }

    return (
        <TopbarContainer>
            <TopbarLogo src={ Logo }/>

            <TopbarSearchContainer>
                <FaSearch/>
                <TopbarSearchInput type="search" placeholder="Cari..."/>
            </TopbarSearchContainer>

            <TopbarFeatureArea>
                <TopbarFeatureContainer>
                    <TopbarFeautureMenu>
                        <FaBell/>
                        <TopbarFeautureMenuBadge>+9</TopbarFeautureMenuBadge>
                    </TopbarFeautureMenu>
                </TopbarFeatureContainer>
                    
                <TopbarProfileContainer>
                    <TopbarProfileName>Achmad Andy</TopbarProfileName>
                    <TopbarProfileImg src="https://ui-avatars.com/api/?name=User+Interface&background=0D8ABC&color=fff"/>
                    <FaChevronDown onClick={ profileToggle }/>

                    <TopbarProfileDropdownContainer ref={ profileRef }>
                        <TopbarProfileDropdownItem to="/user/pengaturan">
                            <FaUserCog/> Pengaturan
                        </TopbarProfileDropdownItem>
                        <TopbarProfileDropdownItemLogout>
                            <FaSignOutAlt/> Keluar
                        </TopbarProfileDropdownItemLogout>
                    </TopbarProfileDropdownContainer>
                </TopbarProfileContainer>
                <TopbarMenuButton>
                    <FaBars/>
                </TopbarMenuButton>
            </TopbarFeatureArea>
        </TopbarContainer>
    )
}

export default Topbar