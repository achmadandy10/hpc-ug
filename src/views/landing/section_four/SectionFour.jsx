import { SectionFourContainer, SectionFourData, SectionFourDataContainer, SectionFourDataDescription, SectionFourDataTitle, SectionFourImg, SectionFourLabel, SectionFourLeft, SectionFourRight, SectionFourTitle } from "./SectionFour.elements"
import Flow from '../../../images/flow.svg'
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
                <SectionFourTitle>Skala infrastruktur komputasi GPU yang mulus</SectionFourTitle>

                <SectionFourDataContainer>
                    <SectionFourData>
                        <SectionFourDataTitle>Multi-node distributed training</SectionFourDataTitle>
                        <SectionFourDataDescription>Instans mendukung bandwidth antar-node hingga 10 Gbps untuk mengaktifkan pelatihan terdistribusi dengan Horovod atau kerangka kerja lain.</SectionFourDataDescription>
                    </SectionFourData>
                    <SectionFourData>
                        <SectionFourDataTitle>Optimalisasi hiper-parameter</SectionFourDataTitle>
                        <SectionFourDataDescription>Kurangi waktu pengoptimalan model dengan menskalakan GPU dalam jumlah besar pada satu atau beberapa instans.</SectionFourDataDescription>
                    </SectionFourData>
                    <SectionFourData>
                        <SectionFourDataTitle>Tumbuh tim peneliti</SectionFourDataTitle>
                        <SectionFourDataDescription>Tambahan sumber daya komputasi yang kelebihan atau kekurangan daya dengan instans khusus untuk anggota tim baru.</SectionFourDataDescription>
                    </SectionFourData>
                </SectionFourDataContainer>
            </SectionFourLeft>

            <SectionFourRight when={ show.right }>
                <SectionFourImg src={ Flow }/>
            </SectionFourRight>
        </SectionFourContainer>
    )
}

export default SectionFour