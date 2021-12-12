import { TopbarContainer, 
    // TopbarFeauture, 
    // TopbarIconBag, 
    // TopbarIconContainer, 
    TopbarLeft, TopbarLogoContainer, TopbarLogoImg, TopbarLogoTitle, TopbarProfile, TopbarProfileDropdownContainer, TopbarProfileDropdownLink, TopbarProfileDropdownList, TopbarProfileDropdownLogout, TopbarProfileImg, TopbarProfileName, TopbarRight, TopbarToggle, TopbarWrapper } from "./Topbar.elements"
import Logo from "../../images/logo.png"
import { 
    FaBars,
    // FaBell, 
    FaChevronDown, 
    // FaQuestionCircle, 
    FaSignOutAlt, FaUser } from "react-icons/fa"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2"

const Topbar = () => {
    const [dropdown, setDropdown] = useState(null)

    const toggleActive = (index) => {
        if (index === dropdown) {
            setDropdown(null)
        } else {
            setDropdown(index)
        }
    }

    const toggleActiveClass = (index) => {
        if (index === dropdown) {
            return "show"
        } else {
            return "hide"
        }
    }

    const history = useHistory();
    const logoutSubmit = () => {
        Swal.fire({
            icon: 'question',
            title: 'Siap untuk Meninggalkan?',
            text: 'Pilih "Keluar" di bawah jika Anda siap untuk mengakhiri sesi Anda saat ini.',
            showCancelButton: true,
            confirmButtonColor: "#5B3A89",
            cancelButtonColor: "#F34636",
            cancelButtonText: 'Batal',
            confirmButtonText: 'Keluar',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon:'success',
                    title: 'Sukses!',
                    text:'Kamu berhasil keluar.',
                })
                history.push('/masuk')
            } else {
                setDropdown(null)
            }
        })
    }

    const toggleMenu = () => {
        const sidebar = document.getElementById("sidebar")
        sidebar.classList.toggle("show")
    }

    var profileLink = ''
    const session = sessionStorage.getItem("role")

    if (session === "Admin") {
        profileLink = "/admin/profil"
    } else if (session === "User") {
        profileLink = "/user/profil"
    }

    return (
        <TopbarContainer>
            <TopbarWrapper>
                <TopbarLeft>
                    <TopbarToggle onClick={ toggleMenu }>
                        <FaBars/>
                    </TopbarToggle>

                    <TopbarLogoContainer>
                        <TopbarLogoImg src={ Logo }/>
                        <TopbarLogoTitle>HPC UG</TopbarLogoTitle>
                    </TopbarLogoContainer>
                </TopbarLeft>

                <TopbarRight>
                    {/* <TopbarFeauture>
                        <TopbarIconContainer>
                            <FaBell/>
                            <TopbarIconBag>+9</TopbarIconBag>
                        </TopbarIconContainer>
                    </TopbarFeauture> */}

                    <TopbarProfile>
                        <TopbarProfileName>Achmad Andy</TopbarProfileName>
                        <TopbarProfileImg src="https://ui-avatars.com/api/?name=Achmad+Andybackground=0D8ABC&color=fff"/>
                        <FaChevronDown onClick={ () => toggleActive(1) }/>
                        <TopbarProfileDropdownContainer className={ toggleActiveClass(1) }>
                            <TopbarProfileDropdownList>
                                <TopbarProfileDropdownLink to={ profileLink } onClick={() => setDropdown(null)}>
                                    <FaUser/>
                                    Profil
                                </TopbarProfileDropdownLink>
                                {/* <TopbarProfileDropdownLink to="/user/bantuan" onClick={() => setDropdown(null)}>
                                    <FaQuestionCircle/>
                                    Bantuan
                                </TopbarProfileDropdownLink> */}
                                <TopbarProfileDropdownLogout onClick={ logoutSubmit }>
                                    <FaSignOutAlt/>
                                    Keluar
                                </TopbarProfileDropdownLogout>
                            </TopbarProfileDropdownList>
                        </TopbarProfileDropdownContainer>
                    </TopbarProfile>
                </TopbarRight>
            </TopbarWrapper>
        </TopbarContainer>
    )
}

export default Topbar