import { NavbarLink, NavbarLinkContainer, NavbarLinkSubitem, NavbarLinkSubitemBorderSlider, NavbarLinkSubitemContainer, NavbarLinkSubitemDescription, NavbarLinkSubitemImg, NavbarLinkSubitemLeft, NavbarLinkSubitemRight, NavbarLinkSubitemTitle, NavbarLinkText, NavbarLinkVerticalPipe, NavbarLogo, NavbarLogoContainer, NavbarTopContainer, NavbarTopLeft, NavbarTopHamburgerBottom, NavbarTopHamburgerContainer, NavbarTopHamburgerMiddle, NavbarTopHamburgerTop, NavbarTopRight, NavbarContainer, NavbarTitle, NavbarMenu, NavbarMenuLink, NavbarMenuContainer } from "./Navbar.elements"
import Logo from '../../images/logo.png'
import { useRef } from "react"
import { ButtonLink } from "../button/Button";

export const NavbarTop = () => {
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

    return (
        <NavbarTopContainer>
            <NavbarTopHamburgerContainer ref={ toggleMenu } onClick={ toggleMenuClicked }>
                <NavbarTopHamburgerTop id="hamburger-bar-top"/>
                <NavbarTopHamburgerMiddle id="hamburger-bar-middle"/>
                <NavbarTopHamburgerBottom id="hamburger-bar-bottom"/>
            </NavbarTopHamburgerContainer>
            
            <NavbarLogoContainer to="/">
                <NavbarLogo src={ Logo }/>
                Universitas Gunadarma
            </NavbarLogoContainer>

            <NavbarTopLeft ref={ menu }>

                <NavbarLinkContainer>
                    <NavbarLink to="/">
                        <NavbarLinkText>Menu 1</NavbarLinkText>
                    </NavbarLink>
                </NavbarLinkContainer>

                <NavbarLinkContainer>
                    <NavbarLink to="/">
                        <NavbarLinkText>Menu 2</NavbarLinkText>
                        <NavbarLinkVerticalPipe/>
                    </NavbarLink>

                    <NavbarLinkSubitemContainer>
                        <NavbarLinkSubitemBorderSlider/>
                        <NavbarLinkSubitem to="/">
                            <NavbarLinkSubitemLeft>
                                <NavbarLinkSubitemImg src={ Logo }/>
                            </NavbarLinkSubitemLeft>
                            <NavbarLinkSubitemRight>
                                <NavbarLinkSubitemTitle>Submenu 1</NavbarLinkSubitemTitle>
                                <NavbarLinkSubitemDescription>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, culpa?</NavbarLinkSubitemDescription>
                            </NavbarLinkSubitemRight>
                        </NavbarLinkSubitem>

                        <NavbarLinkSubitem to="/">
                            <NavbarLinkSubitemLeft>
                                <NavbarLinkSubitemImg src={ Logo }/>
                            </NavbarLinkSubitemLeft>
                            <NavbarLinkSubitemRight>
                                <NavbarLinkSubitemTitle>Submenu 2</NavbarLinkSubitemTitle>
                                <NavbarLinkSubitemDescription>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati, ipsam.</NavbarLinkSubitemDescription>
                            </NavbarLinkSubitemRight>
                        </NavbarLinkSubitem>
                    </NavbarLinkSubitemContainer>
                </NavbarLinkContainer>
                
                <NavbarLinkContainer>
                    <NavbarLink to="/">
                        <NavbarLinkText>Menu 3</NavbarLinkText>
                    </NavbarLink>
                </NavbarLinkContainer>

                <NavbarLinkContainer>
                    <NavbarLink to="/">
                        <NavbarLinkText>Menu 4</NavbarLinkText>
                    </NavbarLink>
                </NavbarLinkContainer>

                <NavbarLinkContainer>
                    <NavbarLink to="/">
                        <NavbarLinkText>Menu 5</NavbarLinkText>
                        <NavbarLinkVerticalPipe/>
                    </NavbarLink>

                    <NavbarLinkSubitemContainer>
                        <NavbarLinkSubitemBorderSlider/>
                        <NavbarLinkSubitem to="/">
                            <NavbarLinkSubitemLeft>
                                <NavbarLinkSubitemImg src={ Logo }/>
                            </NavbarLinkSubitemLeft>
                            <NavbarLinkSubitemRight>
                                <NavbarLinkSubitemTitle>Submenu 1</NavbarLinkSubitemTitle>
                                <NavbarLinkSubitemDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, soluta.</NavbarLinkSubitemDescription>
                            </NavbarLinkSubitemRight>
                        </NavbarLinkSubitem>

                        <NavbarLinkSubitem to="/">
                            <NavbarLinkSubitemLeft>
                                <NavbarLinkSubitemImg src={ Logo }/>
                            </NavbarLinkSubitemLeft>
                            <NavbarLinkSubitemRight>
                                <NavbarLinkSubitemTitle>Submenu 2</NavbarLinkSubitemTitle>
                                <NavbarLinkSubitemDescription>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, blanditiis.</NavbarLinkSubitemDescription>
                            </NavbarLinkSubitemRight>
                        </NavbarLinkSubitem>
                    </NavbarLinkSubitemContainer>
                </NavbarLinkContainer>

                <NavbarLinkContainer>
                    <NavbarLink to="/">
                        <NavbarLinkText>Menu 6</NavbarLinkText>
                    </NavbarLink>
                </NavbarLinkContainer>
            </NavbarTopLeft>

            <NavbarTopRight>
                <NavbarLinkContainer>
                    <NavbarLink to="/">
                        <NavbarLinkText>+62 (858) 7682-9359</NavbarLinkText>
                    </NavbarLink>
                </NavbarLinkContainer>
            </NavbarTopRight>
        </NavbarTopContainer>
    )
}

const Navbar = () => {
    return (
        <NavbarContainer>
            <NavbarTitle to="/">HPC Gunadarma</NavbarTitle>

            <NavbarMenuContainer>
                <NavbarMenu>
                    <NavbarMenuLink to="/">View 1</NavbarMenuLink>
                    <NavbarMenuLink to="/">View 2</NavbarMenuLink>
                    <NavbarMenuLink to="/">View 3</NavbarMenuLink>
                </NavbarMenu>

                <ButtonLink to="/">Daftar</ButtonLink>
            </NavbarMenuContainer>
        </NavbarContainer>
    )
}

export default Navbar