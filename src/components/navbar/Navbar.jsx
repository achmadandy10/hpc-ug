import { NavbarLogo, NavbarLogoContainer, NavbarHamburgerBottom, NavbarHamburgerContainer, NavbarHamburgerMiddle, NavbarHamburgerTop, NavbarContainer, NavbarMenu, NavbarMenuList, NavbarMenuLink, NavbarMenuItem, NavbarSubMenuList, NavbarSubMenuItem, NavbarSubMenuLink } from "./Navbar.elements"
import UG from '../../images/logo.png'
import Kedaireka from '../../images/kedaireka.svg'
import Kemendikbud from '../../images/kemendikbud.png'
import { useRef, useState } from "react"
import { ButtonLink } from "../button/Button";
import { FaChevronDown } from "react-icons/fa"

const Navbar = () => {
    const toggleMenu = useRef(null);
    const menu = useRef(null);

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
                            <NavbarSubMenuItem>
                                <NavbarSubMenuLink to="/tentang/hpc">HPC</NavbarSubMenuLink>
                            </NavbarSubMenuItem>
                            <NavbarSubMenuItem>
                                <NavbarSubMenuLink to="/tentang/dgx-a-100">DGX A-100</NavbarSubMenuLink>
                            </NavbarSubMenuItem>
                            <NavbarSubMenuItem>
                                <NavbarSubMenuLink to="/tentang/syarat-dan-ketentuan">Syarat dan Ketentuan</NavbarSubMenuLink>
                            </NavbarSubMenuItem>
                        </NavbarSubMenuList>
                    </NavbarMenuItem>
                    
                    <NavbarMenuItem>
                        <NavbarMenuLink to="/layanan">Layanan <FaChevronDown/></NavbarMenuLink>
                        <NavbarSubMenuList>
                            <NavbarSubMenuItem>
                                <NavbarSubMenuLink to="/layanan/prototyping">Prototyping</NavbarSubMenuLink>
                            </NavbarSubMenuItem>
                            <NavbarSubMenuItem>
                                <NavbarSubMenuLink to="/layanan/training">Training</NavbarSubMenuLink>
                            </NavbarSubMenuItem>
                            <NavbarSubMenuItem>
                                <NavbarSubMenuLink to="/layanan/database">Database</NavbarSubMenuLink>
                            </NavbarSubMenuItem>
                            <NavbarSubMenuItem>
                                <NavbarSubMenuLink to="/layanan/hpc">HPC</NavbarSubMenuLink>
                            </NavbarSubMenuItem>
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