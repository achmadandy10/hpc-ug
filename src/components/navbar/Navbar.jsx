import { NavbarLogo, NavbarLogoContainer, NavbarHamburgerBottom, NavbarHamburgerContainer, NavbarHamburgerMiddle, NavbarHamburgerTop, NavbarContainer, NavbarMenu, NavbarMenuLink, NavbarMenuContainer, NavbarSubmenuLinkContainer, NavbarSubmenuLink } from "./Navbar.elements"
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

            <NavbarMenuContainer>
                <NavbarMenu ref={ menu }>
                    <NavbarMenuLink to="/berita">Berita</NavbarMenuLink>
                    <NavbarMenuLink to="/tentang">
                        Tentang <FaChevronDown/>
                        <NavbarSubmenuLinkContainer>
                            <NavbarSubmenuLink to="/tentang/hpc">
                                HPC
                            </NavbarSubmenuLink>
                            <NavbarSubmenuLink to="/tentang/dgx-a-100">
                                DGX A-100
                            </NavbarSubmenuLink>
                            <NavbarSubmenuLink to="/tentang/syarat-penggunaan">
                                Syarat Penggunaan
                            </NavbarSubmenuLink>
                        </NavbarSubmenuLinkContainer>
                    </NavbarMenuLink>
                    <NavbarMenuLink to="/produk">
                        Layanan <FaChevronDown/>
                        <NavbarSubmenuLinkContainer>
                            <NavbarSubmenuLink to="/produk/prototyping">
                                Prototyping
                            </NavbarSubmenuLink>
                            <NavbarSubmenuLink to="/produk/training">
                                Training
                            </NavbarSubmenuLink>
                            <NavbarSubmenuLink to="/produk/database">
                                Database
                            </NavbarSubmenuLink>
                            <NavbarSubmenuLink to="/produk/hpc">
                                HPC
                            </NavbarSubmenuLink>
                        </NavbarSubmenuLinkContainer>
                    </NavbarMenuLink>
                    <NavbarMenuLink to="/kontak">Kontak</NavbarMenuLink>
                    <ButtonLink to="/masuk">Masuk</ButtonLink>
                </NavbarMenu>


                <NavbarHamburgerContainer ref={ toggleMenu } onClick={ toggleMenuClicked }>
                    <NavbarHamburgerTop id="hamburger-bar-top"/>
                    <NavbarHamburgerMiddle id="hamburger-bar-middle"/>
                    <NavbarHamburgerBottom id="hamburger-bar-bottom"/>
                </NavbarHamburgerContainer>
            </NavbarMenuContainer>
        </NavbarContainer>
    )
}

export default Navbar