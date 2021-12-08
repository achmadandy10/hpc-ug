import { SectionOneButtonContainer, SectionOneContainer, SectionOneContentLeft, SectionOneContentRight, SectionOneDescription, SectionOneImg, SectionOneImgFeature, SectionOneImgFeatureContainer, SectionOneImgFeatureContent, SectionOneTitle, SectionOneTitleColor, SectionOneTitleFeature } from "./SectionOne.elements"
import Feature1 from '../../../images/anthem-gray-lockup.svg'
import Feature2 from '../../../images/cmu-gray-lockup.svg'
import Feature3 from '../../../images/lanl-gray-lockup.svg'
import Feature4 from '../../../images/mit-gray-lockup.svg'
import Tect from '../../../images/tect.svg'
import { ButtonLink } from "../../../components/button/Button"
import Fade from 'react-reveal/Fade'

const SectionOne = () => {
    return (
        <SectionOneContainer>
            <Fade left>
                <SectionOneContentLeft>
                    <SectionOneTitle>
                        Pengembangan DGX 
                        <SectionOneTitleColor> Universitas Gunadarma</SectionOneTitleColor>
                    </SectionOneTitle>

                    <SectionOneDescription>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod blanditiis ab, fuga magni totam reiciendis! Assumenda harum necessitatibus repellat aut!
                    </SectionOneDescription>
                    
                    <SectionOneButtonContainer>
                        <ButtonLink to="/masuk" width={ 150 }>Masuk</ButtonLink>
                        <ButtonLink to="/daftar" btnType="border" width={ 150 }>Daftar</ButtonLink>
                    </SectionOneButtonContainer>
                    
                    <SectionOneTitleFeature>Fitur - Fitur</SectionOneTitleFeature>
                    <SectionOneImgFeatureContainer>
                        <SectionOneImgFeatureContent>
                            <SectionOneImgFeature src={ Feature1 }/>
                        </SectionOneImgFeatureContent>
                        
                        <SectionOneImgFeatureContent>
                            <SectionOneImgFeature src={ Feature2 }/>
                        </SectionOneImgFeatureContent>

                        <SectionOneImgFeatureContent>
                            <SectionOneImgFeature src={ Feature3 }/>
                        </SectionOneImgFeatureContent>

                        <SectionOneImgFeatureContent>
                            <SectionOneImgFeature src={ Feature4 }/>
                        </SectionOneImgFeatureContent>
                    </SectionOneImgFeatureContainer>
                </SectionOneContentLeft>
            </Fade>

            <Fade right>
                <SectionOneContentRight>
                    <SectionOneImg src={ Tect }/>
                </SectionOneContentRight>
            </Fade>
        </SectionOneContainer>
    )
}

export default SectionOne