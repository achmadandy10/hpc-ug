import Footer from "../../components/footer/Footer"
import Navbar from "../../components/navbar/Navbar"
import ThemeChange from "../../components/theme_change/ThemeChange"
import SectionLanding from "../../views/landing/SectionLanding"

const LandingLayout = () => {
    return (
        <>
            <Navbar/>
            <SectionLanding/>
            <ThemeChange/>
            <Footer/>
        </>
    )
}

export default LandingLayout