import { SectionOneButtonContainer, SectionOneContainer, SectionOneContentLeft, SectionOneContentRight, SectionOneDescription, SectionOneImg, SectionOneTitle, SectionOneTitleColor } from "./SectionOne.elements"
import Tect from '../../../images/tect.svg'
import TectBlue from '../../../images/tect-blue.svg'
import { ButtonLink } from "../../../components/button/Button"
import Fade from 'react-reveal/Fade'

const SectionOne = () => {
    return (
        <SectionOneContainer>
            <Fade left>
                <SectionOneContentLeft>
                    <SectionOneTitle>
                        Universitas Gunadarma 
                        <br/>
                        <SectionOneTitleColor> AI Center of Excellence</SectionOneTitleColor>
                    </SectionOneTitle>

                    <SectionOneDescription>
                        Membangun jaringan dan sharing resource untuk mengembangkan Kecerdasan Buatan di Indonesia, UG-AI-Coe Menjadi jaringan kerjasama AI antar kampus partner Gunadarma.
                    </SectionOneDescription>
                    
                    <SectionOneButtonContainer>
                        <ButtonLink to="/masuk" width={ 150 }>Masuk</ButtonLink>
                        <ButtonLink to="/daftar" btnType="border" width={ 150 }>Daftar</ButtonLink>
                    </SectionOneButtonContainer>
                </SectionOneContentLeft>
            </Fade>

            <Fade right>
                <SectionOneContentRight>
                    <SectionOneImg src={ sessionStorage.getItem('theme') === 'blue-theme' ? TectBlue : Tect }/>
                </SectionOneContentRight>
            </Fade>
        </SectionOneContainer>
    )
}

export default SectionOne