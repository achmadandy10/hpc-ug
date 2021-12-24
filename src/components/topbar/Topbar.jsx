import { TopbarContainer, TopbarLeft, TopbarLogoContainer, TopbarLogoImg, TopbarLogoTitle, TopbarProfile, TopbarProfileDropdownContainer, TopbarProfileDropdownLink, TopbarProfileDropdownList, TopbarProfileDropdownLogout, TopbarProfileImg, TopbarProfileName, TopbarRight, TopbarToggle, TopbarWrapper } from "./Topbar.elements"
import Logo from "../../images/logo.png"
import { FaBars, FaChevronDown, FaSignOutAlt, FaUser } from "react-icons/fa"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2"
import axios from "axios"

const Topbar = () => {
    const [dropdown, setDropdown] = useState(null)
    const [profile, setProfile] = useState([])

    useEffect(() => {
        const getProfile = () => {
            axios.get('/api/profile').then(res => {
                if (res.data.meta.code === 200) {
                    setProfile(res.data.data.profile)
                }
            })
        }

        getProfile()
    }, [])

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
                axios.post('/api/logout').then(res => {
                    if (res.data.meta.code === 200) {
                        sessionStorage.removeItem('token')
                        sessionStorage.removeItem('role')

                        Swal.fire({
                            icon:'success',
                            title: 'Sukses!',
                            text:'Kamu berhasil keluar.',
                        })
                        
                        history.push('/masuk')
                    } else {
                        Swal.fire({
                            icon:'danger',
                            title: 'Gagal!',
                            text:'Kamu gagal keluar.',
                        })
                    }
                })
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
    const role = sessionStorage.getItem("role")

    if (role === "Content" || role === "Proposal" || role === "Super") {
        profileLink = "/admin/profil"
    } else if (role === "Internal" || role === "External") {
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
                    <TopbarProfile>
                        <TopbarProfileName>{ profile.first_name + " " + profile.last_name }</TopbarProfileName>
                        <TopbarProfileImg src={ profile.avatar !== null ? profile.avatar : "https://ui-avatars.com/api/?name=" + profile.first_name + "+" + profile.last_name + "background=0D8ABC&color=fff" }/>
                        <FaChevronDown onClick={ () => toggleActive(1) }/>
                        <TopbarProfileDropdownContainer className={ toggleActiveClass(1) }>
                            <TopbarProfileDropdownList>
                                <TopbarProfileDropdownLink to={ profileLink } onClick={() => setDropdown(null)}>
                                    <FaUser/>
                                    Profil
                                </TopbarProfileDropdownLink>
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