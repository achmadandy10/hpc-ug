import { SectionTwoContainer, SectionTwoFeatureContainer, SectionTwoInfoContainer, SectionTwoInfoDescription, SectionTwoInfoTitle, SectionTwoLeft, SectionTwoLeftData, SectionTwoLeftDataContainer, SectionTwoLeftDataDescription, SectionTwoLeftDataTitle, SectionTwoLeftLabel, SectionTwoLeftTitle, SectionTwoRight, SectionTwoRightData, SectionTwoRightDataImg } from "./SectionTwo.elements"
import Tensor from '../../../../images/tf-color-lockup.svg'
import Jupyter from '../../../../images/jupyter-color-lockup.svg'
import PyTorch from '../../../../images/pytorch-color-lockup.svg'
import Keras from '../../../../images/keras-color-lockup.svg'
import Ubuntu from '../../../../images/ubuntu-color-lockup.svg'
import { useEffect, useState } from "react"

const SectionTwo = () => {
    const [show, setShow] = useState({
        info: false,
        left: false,
        right: false,
    })

    
    useEffect(() => {
        const showElement = () => {
            if (window.scrollY >= 200) {
                setShow({ info: true })
            } else {
                setShow({ 
                    info: false,
                })
            }

            if (window.scrollY >= 250) {
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
        <SectionTwoContainer when={ show.info }>
            <SectionTwoInfoContainer>
                <SectionTwoInfoTitle>Mendukung penelitian di setiap tahap</SectionTwoInfoTitle>
                <SectionTwoInfoDescription>
                    Mulai membangun Kecerdasan Buatan sejak tahap prototyping sampai dengan training dan inference
                </SectionTwoInfoDescription>
            </SectionTwoInfoContainer>

            <SectionTwoFeatureContainer>
                <SectionTwoLeft when={ show.left }>
                    <SectionTwoLeftLabel>Fasilitas</SectionTwoLeftLabel>
                    <SectionTwoLeftTitle>Memulai Model Pelatihan Segera</SectionTwoLeftTitle>
                
                    <SectionTwoLeftDataContainer>
                        <SectionTwoLeftData>
                            <SectionTwoLeftDataTitle>Pre-installed Environtment</SectionTwoLeftDataTitle>
                            <SectionTwoLeftDataDescription>Setiap environment telah di install sebelum setelah usulan dari pengusul diterima oleh tim approval.</SectionTwoLeftDataDescription>
                        </SectionTwoLeftData>
                        <SectionTwoLeftData>
                            <SectionTwoLeftDataTitle>Juputerlab</SectionTwoLeftDataTitle>
                            <SectionTwoLeftDataDescription>Setiap Environment yang diusulkan akan memiliki Jupyterlab khusus untuk pengusul dengan resource yang bisa ditentukan sebelumnya.</SectionTwoLeftDataDescription>
                        </SectionTwoLeftData>
                        <SectionTwoLeftData>
                            <SectionTwoLeftDataTitle>ClearML</SectionTwoLeftDataTitle>
                            <SectionTwoLeftDataDescription>Sebuah envoronment AI Production yang digunakan untuk menjalankan training, model dan hasil program kecerdasan buatan.</SectionTwoLeftDataDescription>
                        </SectionTwoLeftData>
                    </SectionTwoLeftDataContainer>
                </SectionTwoLeft>

                <SectionTwoRight when={ show.right }>
                    <SectionTwoRightData>
                        <SectionTwoRightDataImg src={ Tensor }/>
                    </SectionTwoRightData>
                    <SectionTwoRightData>
                        <SectionTwoRightDataImg src={ Jupyter }/>
                    </SectionTwoRightData>
                    <SectionTwoRightData>
                        <SectionTwoRightDataImg src={ PyTorch }/>
                    </SectionTwoRightData>
                    <SectionTwoRightData>
                        <SectionTwoRightDataImg src={ Keras }/>
                    </SectionTwoRightData>
                    <SectionTwoRightData>
                        <SectionTwoRightDataImg src={ Ubuntu }/>
                    </SectionTwoRightData>
                    <SectionTwoRightData>
                        <SectionTwoRightDataImg src={ Ubuntu }/>
                    </SectionTwoRightData>
                </SectionTwoRight>
            </SectionTwoFeatureContainer>
        </SectionTwoContainer>
    )
}

export default SectionTwo