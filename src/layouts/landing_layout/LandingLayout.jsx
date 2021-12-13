import Footer from "../../components/footer/Footer"
import Navbar from "../../components/navbar/Navbar"
import SectionLanding from "../../views/landing/SectionLanding"

const LandingLayout = () => {
    return (
        <>
            <Navbar/>
            <SectionLanding/>
            <Footer/>
        </>
    )
}

export default LandingLayout