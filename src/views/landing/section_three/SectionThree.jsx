import { SectionThreeContainer, SectionThreeData, SectionThreeDataContainer, SectionThreeDataDescription, SectionThreeDataTitle, SectionThreeImg, SectionThreeLabel, SectionThreeLeft, SectionThreeRight, SectionThreeTitle } from "./SectionThree.elements"
import Chart from '../../../images/chart.svg' 

const SectionThree = () => {
    return (
        <SectionThreeContainer>
            <SectionThreeLeft>
                <SectionThreeImg src={ Chart }/>
            </SectionThreeLeft>
        
            <SectionThreeRight>
                <SectionThreeLabel>Label</SectionThreeLabel>
                <SectionThreeTitle>Biaya komputasi yang lebih rendah, tanpa komitmen</SectionThreeTitle>

                <SectionThreeDataContainer>
                    <SectionThreeData>
                        <SectionThreeDataTitle>Hemat hingga 50% untuk biaya komputasi</SectionThreeDataTitle>
                        <SectionThreeDataDescription>Dengan membangun infrastruktur komputasi dalam skala besar untuk persyaratan unik peneliti pembelajaran mendalam, Lambda dapat memberikan penghematan yang signifikan.</SectionThreeDataDescription>
                    </SectionThreeData>
                    <SectionThreeData>
                        <SectionThreeDataTitle>Kurangi TCO awan</SectionThreeDataTitle>
                        <SectionThreeDataDescription>Manfaatkan fleksibilitas penggunaan komputasi awan tanpa membayar mahal dalam harga sesuai permintaan saat beban kerja meningkat pesat.</SectionThreeDataDescription>
                    </SectionThreeData>
                    <SectionThreeData>
                        <SectionThreeDataTitle>Tidak ada komitmen multi-tahun</SectionThreeDataTitle>
                        <SectionThreeDataDescription>Kami memberikan harga sesuai permintaan pada atau di bawah harga komitmen satu tahun biasa — Anda mendapat manfaat dari biaya yang lebih rendah tanpa mengunci jenis instans tertentu.</SectionThreeDataDescription>
                    </SectionThreeData>
                </SectionThreeDataContainer>
            </SectionThreeRight>
        </SectionThreeContainer>
    )
}

export default SectionThree