import { CopyRightContainer, FooterContainer, FooterCopyRight, FooterInfo, FooterLink, FooterSocial } from "./Footer.elements"
import { FaFacebook, FaTwitter, FaGithub } from 'react-icons/fa'

export const CopyRight = () => {
    return (
        <CopyRightContainer>
            &copy; 2021 Universitas Gunadarma
        </CopyRightContainer>
    )
}

const Footer = () => {
    return (
        <FooterContainer>
            <FooterCopyRight>&copy; 2021 Universitas Gunadarma</FooterCopyRight>
            <FooterInfo>
                <FooterLink to="/">Forum</FooterLink>
                <FooterLink to="/">Tentang</FooterLink>
                <FooterLink to="/">Blog</FooterLink>
                <FooterLink to="/">Syarat dan Ketentuan</FooterLink>
                <FooterLink to="/">Karir</FooterLink>
                <FooterLink to="/">Kontak</FooterLink>
            </FooterInfo>
            <FooterSocial>
                <FooterLink to="/">
                    <FaFacebook/>
                </FooterLink>
                <FooterLink to="/">
                    <FaTwitter/>
                </FooterLink>
                <FooterLink to="/">
                    <FaGithub/>
                </FooterLink>
            </FooterSocial>
        </FooterContainer>
    )
}   

export default Footer