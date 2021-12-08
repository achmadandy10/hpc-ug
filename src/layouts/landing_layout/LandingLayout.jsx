import Footer from "../../components/footer/Footer"
import Navbar, { NavbarTop } from "../../components/navbar/Navbar"
import SectionLanding from "../../views/landing/SectionLanding"

const LandingLayout = () => {
    return (
        <>
            <NavbarTop/>
            <Navbar/>

            <SectionLanding/>

            <Footer/>
        </>
    )
}

export default LandingLayout