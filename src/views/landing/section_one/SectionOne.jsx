import { SectionOneButtonContainer, SectionOneContainer, SectionOneContentLeft, SectionOneContentRight, SectionOneDescription, SectionOneImg, SectionOneImgFeature, SectionOneImgFeatureContainer, SectionOneImgFeatureContent, SectionOneTitle, SectionOneTitleColor, SectionOneTitleFeature } from "./SectionOne.elements"
import Feature1 from '../../../images/anthem-gray-lockup.svg'
import Feature2 from '../../../images/cmu-gray-lockup.svg'
import Feature3 from '../../../images/lanl-gray-lockup.svg'
import Feature4 from '../../../images/mit-gray-lockup.svg'
import Tect from '../../../images/tect.svg'
import { ButtonLink } from "../../../components/button/Button"

const SectionOne = () => {
    return (
        <SectionOneContainer>
            <SectionOneContentLeft>
                <SectionOneTitle>
                    Pengembangan DGX 
                    <br/>
                    <SectionOneTitleColor>Universitas Gunadarma</SectionOneTitleColor>
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

            <SectionOneContentRight>
                <SectionOneImg src={ Tect }/>
            </SectionOneContentRight>
        </SectionOneContainer>
    )
}

export default SectionOne