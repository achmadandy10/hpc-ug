import { NavbarLogo, NavbarLogoContainer, NavbarHamburgerBottom, NavbarHamburgerContainer, NavbarHamburgerMiddle, NavbarHamburgerTop, NavbarContainer, NavbarMenu, NavbarMenuList, NavbarMenuLink, NavbarMenuItem, NavbarSubMenuList, NavbarSubMenuItem, NavbarSubMenuLink } from "./Navbar.elements"
import UG from '../../images/logo.png'
import Kedaireka from '../../images/kedaireka.svg'
import Kemendikbud from '../../images/kemendikbud.png'
import { useEffect, useRef, useState } from "react"
import { ButtonLink } from "../button/Button";
import { FaChevronDown } from "react-icons/fa"
import axios from "axios"

const Navbar = () => {
    const toggleMenu = useRef(null);
    const menu = useRef(null);
    const [loading, setLoading] = useState(true)
    const [about, setAbout] = useState([])
    const [service, setService] = useState([])

    useEffect(() => {
        const GetUri = () => {
            axios.get('/api/content/uri').then(res => {
                if (res.data.meta.code === 200) {
                    setAbout(res.data.data.uri_about)
                    setService(res.data.data.uri_service)
                }
                setLoading(false)
            })
        }
        GetUri()
    }, [])

    let uri_about = ''
    let uri_service = ''

    if (loading) {
        uri_about = 'loading...'
        uri_service = 'loading...'
    } else {
        uri_about = about.map((v, idx) => {
            return (
                <NavbarSubMenuItem key={idx}>
                    <NavbarSubMenuLink to={"/tentang/" + v.slug}>{ v.label }</NavbarSubMenuLink>
                </NavbarSubMenuItem>
            )
        })
        uri_service = service.map((v, idx) => {
            return (
                <NavbarSubMenuItem key={idx}>
                    <NavbarSubMenuLink to={"/layanan/" + v.slug}>{ v.label }</NavbarSubMenuLink>
                </NavbarSubMenuItem>
            )
        })
    }

    const toggleMenuClicked = () => {
        const child = toggleMenu.current.children
        for (var i = 0; i < child.length; i++) {
            const element = child[i];
            element.classList.toggle('x')
        }

        menu.current.classList.toggle('show')
    }

    const [scroll, setScroll]= useState(false)

    const changeScroll = () => {
        if (window.scrollY >= 80) {
            setScroll(true)
        } else {
            setScroll(false)
        }
    }

    window.addEventListener('scroll', changeScroll)

    return (
        <NavbarContainer className={ scroll ? "scroll" : "" }>
            <NavbarLogoContainer to="/">
                <NavbarLogo src={ UG }/>
                <NavbarLogo src={ Kemendikbud }/>
                <NavbarLogo src={ Kedaireka }/>
            </NavbarLogoContainer>

            <NavbarMenu ref={ menu }>
                <NavbarMenuList>
                    <NavbarMenuItem>
                        <NavbarMenuLink to="/berita">Berita</NavbarMenuLink>
                    </NavbarMenuItem>
                    
                    <NavbarMenuItem>
                        <NavbarMenuLink to="/tentang">Tentang <FaChevronDown/></NavbarMenuLink>
                        <NavbarSubMenuList>
                            { uri_about }
                        </NavbarSubMenuList>
                    </NavbarMenuItem>
                    
                    <NavbarMenuItem>
                        <NavbarMenuLink to="/layanan">Layanan <FaChevronDown/></NavbarMenuLink>
                        <NavbarSubMenuList>
                            { uri_service }
                        </NavbarSubMenuList>
                    </NavbarMenuItem>

                    <NavbarMenuItem>
                        <NavbarMenuLink to="/kontak">Kontak</NavbarMenuLink>
                    </NavbarMenuItem>

                    <NavbarMenuItem>
                        <ButtonLink to="/masuk">Masuk</ButtonLink>
                    </NavbarMenuItem>
                </NavbarMenuList>
            </NavbarMenu>
            <NavbarHamburgerContainer ref={ toggleMenu } onClick={ toggleMenuClicked }>
                <NavbarHamburgerTop id="hamburger-bar-top"/>
                <NavbarHamburgerMiddle id="hamburger-bar-middle"/>
                <NavbarHamburgerBottom id="hamburger-bar-bottom"/>
            </NavbarHamburgerContainer>
        </NavbarContainer>
    )
}

export default Navbar