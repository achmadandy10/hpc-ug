import { SectionFourContainer, SectionFourData, SectionFourDataContainer, SectionFourDataDescription, SectionFourDataTitle, SectionFourImg, SectionFourLabel, SectionFourLeft, SectionFourRight, SectionFourTitle } from "./SectionFour.elements"
import Flow from '../../../images/flow.svg'
import FlowBlue from '../../../images/flow-blue.svg'
import { useEffect, useState } from "react"

const SectionFour = () => {
    const [show, setShow] = useState({
        left: false,
        right: false,
    })

    
    useEffect(() => {
        const showElement = () => {
            if (window.scrollY >= 450) {
                setShow({ 
                    left: true, 
                    right: true 
                })
            } else {
                setShow({ 
                    left: false, 
                    right: false, 
                })
            }
        }
        window.addEventListener('scroll', showElement)
        showElement()
    }, [])

    return (
        <SectionFourContainer>
            <SectionFourLeft when={ show.left }>
                <SectionFourLabel>Meningkatkan</SectionFourLabel>
                <SectionFourTitle>Skala infrastruktur komputasi GPU dan CPU</SectionFourTitle>

                <SectionFourDataContainer>
                    <SectionFourData>
                        <SectionFourDataTitle>Optimasi GPU</SectionFourDataTitle>
                        <SectionFourDataDescription>
                            Menggunkanan DGX-A100 Core berbasiskan NVIDIA Ampere yang memang dikhusukan untuk kebutuhan kecerdasan buatan sehingga code lebih cepat dieksekusi daripada pada GPU Biasa
                        </SectionFourDataDescription>
                    </SectionFourData>
                    <SectionFourData>
                        <SectionFourDataTitle>Optimasi CPU</SectionFourDataTitle>
                        <SectionFourDataDescription>
                            Dengan kemampuan CPU AMD proses HPC dapat dieksekusi lbh cepat dimesin DGX ketimbang personal computer maupun di server.
                        </SectionFourDataDescription>
                    </SectionFourData>
                    <SectionFourData>
                        <SectionFourDataTitle>Pegembangan Peneliti</SectionFourDataTitle>
                        <SectionFourDataDescription>
                            Dengan menggunakan fasilitas UG-AI-Coe Peneliti dapat berbagi informasi terhadap penelitiannya, sehingga memungkinkan kolaborasi antar peneliti
                        </SectionFourDataDescription>
                    </SectionFourData>
                </SectionFourDataContainer>
            </SectionFourLeft>

            <SectionFourRight when={ show.right }>
                <SectionFourImg src={ sessionStorage.getItem('theme') === 'blue-theme' ? FlowBlue : Flow }/>
            </SectionFourRight>
        </SectionFourContainer>
    )
}

export default SectionFour