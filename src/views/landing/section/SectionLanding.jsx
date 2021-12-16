import { SectionLandingContainer } from "./SectionLanding.elements"
import SectionFour from "./section_four/SectionFour"
import SectionOne from "./section_one/SectionOne"
import SectionThree from "./section_three/SectionThree"
import SectionTwo from "./section_two/SectionTwo"

const SectionLanding = () => {
    return (
        <SectionLandingContainer>
            <SectionOne/>
            <SectionTwo/>
            <SectionThree/>
            <SectionFour/>
        </SectionLandingContainer>
    )
}

export default SectionLanding