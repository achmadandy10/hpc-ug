import { SectionThreeContainer, SectionThreeData, SectionThreeDataContainer, SectionThreeDataDescription, SectionThreeDataTitle, SectionThreeImg, SectionThreeLabel, SectionThreeLeft, SectionThreeRight, SectionThreeTitle } from "./SectionThree.elements"
import Chart from '../../../../images/chart.svg' 
import { useEffect, useState } from "react"

const SectionThree = () => {
    const [show, setShow] = useState({
        left: false,
        right: false,
    })

    
    useEffect(() => {
        const showElement = () => {
            if (window.scrollY >= 350) {
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
        <SectionThreeContainer>
            <SectionThreeLeft when={ show.left }>
                <SectionThreeImg src={ Chart }/>
            </SectionThreeLeft>
        
            <SectionThreeRight when={ show.right }>
                <SectionThreeLabel>Keungulan</SectionThreeLabel>
                <SectionThreeTitle>Biaya komputasi yang lebih rendah</SectionThreeTitle>

                <SectionThreeDataContainer>
                    <SectionThreeData>
                        <SectionThreeDataTitle>Hemat 100% untuk partner Universitas Gunadarma</SectionThreeDataTitle>
                        <SectionThreeDataDescription>
                            Dengan menggunakan fasilita UG-AI-Coe peneliti dapat menekan biaya yang dikeluarkan untuk pembelian resource, sehingga dana bisa digunakan untuk kebutuhan lain .
                        </SectionThreeDataDescription>
                    </SectionThreeData>
                    <SectionThreeData>
                        <SectionThreeDataTitle>Penggunaan Flexibel</SectionThreeDataTitle>
                        <SectionThreeDataDescription>
                            Pengguna dapat menggunakan fasilitas untuk Prototyping, training maupun inference.
                        </SectionThreeDataDescription>
                    </SectionThreeData>
                    <SectionThreeData>
                        <SectionThreeDataTitle>NVIDIA DGX-A100</SectionThreeDataTitle>
                        <SectionThreeDataDescription>
                            Penggunaan Mesin tercepat NVIDIA saat ini, DGX-A100 memberikan garansi performa yang meyakinkan untuk kebutuhan AI, HPC dan Visualisasi.
                        </SectionThreeDataDescription>
                    </SectionThreeData>
                </SectionThreeDataContainer>
            </SectionThreeRight>
        </SectionThreeContainer>
    )
}

export default SectionThree