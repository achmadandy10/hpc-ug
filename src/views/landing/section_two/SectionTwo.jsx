import { SectionTwoContainer, SectionTwoFeatureContainer, SectionTwoInfoContainer, SectionTwoInfoDescription, SectionTwoInfoTitle, SectionTwoLeft, SectionTwoLeftData, SectionTwoLeftDataContainer, SectionTwoLeftDataDescription, SectionTwoLeftDataTitle, SectionTwoLeftLabel, SectionTwoLeftTitle, SectionTwoRight, SectionTwoRightData, SectionTwoRightDataImg } from "./SectionTwo.elements"
import Tensor from '../../../images/tf-color-lockup.svg'
import Jupyter from '../../../images/jupyter-color-lockup.svg'
import PyTorch from '../../../images/pytorch-color-lockup.svg'
import Keras from '../../../images/keras-color-lockup.svg'
import Ubuntu from '../../../images/ubuntu-color-lockup.svg'

const SectionTwo = () => {
    return (
        <SectionTwoContainer>
            <SectionTwoInfoContainer>
                <SectionTwoInfoTitle>Mendukung penelitian di setiap tahap</SectionTwoInfoTitle>
                <SectionTwoInfoDescription>Mulai atau tingkatkan proyek Deep Learning Anda dengan Lambda Cloud. Mulai dengan cepat, hemat biaya komputasi, dan skalakan ke ratusan GPU dengan mudah.</SectionTwoInfoDescription>
            </SectionTwoInfoContainer>

            <SectionTwoFeatureContainer>
                <SectionTwoLeft>
                    <SectionTwoLeftLabel>Temukan Lebih Bayak</SectionTwoLeftLabel>
                    <SectionTwoLeftTitle>Mulai model pelatihan segera</SectionTwoLeftTitle>
                
                    <SectionTwoLeftDataContainer>
                        <SectionTwoLeftData>
                            <SectionTwoLeftDataTitle>Kerangka kerja utama sudah diinstal sebelumnya</SectionTwoLeftDataTitle>
                            <SectionTwoLeftDataDescription>Setiap VM telah diinstal sebelumnya dengan versi terbaru Lambda Stack — yang mencakup kerangka kerja pembelajaran mendalam utama dan driver CUDA®.</SectionTwoLeftDataDescription>
                        </SectionTwoLeftData>
                        <SectionTwoLeftData>
                            <SectionTwoLeftDataTitle>Buku catatan Jupyter</SectionTwoLeftDataTitle>
                            <SectionTwoLeftDataDescription>Dalam hitungan detik, akses lingkungan pengembangan Notebook Jupyter khusus untuk setiap mesin langsung dari dasbor cloud.</SectionTwoLeftDataDescription>
                        </SectionTwoLeftData>
                        <SectionTwoLeftData>
                            <SectionTwoLeftDataTitle>Akses SSH langsung</SectionTwoLeftDataTitle>
                            <SectionTwoLeftDataDescription>Untuk akses langsung, sambungkan melalui Terminal Web di dasbor atau gunakan SSH langsung dengan salah satu kunci SSH yang Anda sediakan.</SectionTwoLeftDataDescription>
                        </SectionTwoLeftData>
                    </SectionTwoLeftDataContainer>
                </SectionTwoLeft>

                <SectionTwoRight>
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