import { SidebarContainer, SidebarDashboard, SidebarList, SidebarListItem, SidebarLogout, SidebarMenu, SidebarMenuContainer, SidebarTitle } from "./Sidebar.elements"
import { MdDashboard } from "react-icons/md"
import { FaFileInvoice, FaList, FaPenSquare, FaSignOutAlt, FaTags } from "react-icons/fa"
import Swal from "sweetalert2"
import { useHistory } from "react-router-dom"
import axios from "axios"

const Sidebar = ({ type }) => {
    const history = useHistory();
    const logoutSubmit = () => {
        Swal.fire({
            icon: 'question',
            title: 'Siap untuk Meninggalkan?',
            text: 'Pilih "Keluar" di bawah jika Anda siap untuk mengakhiri sesi Anda saat ini.',
            showCancelButton: true,
            confirmButtonColor: "#5B3A89",
            cancelButtonColor: "#F34636",
            cancelButtonText: 'Batal',
            confirmButtonText: 'Keluar',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('/api/logout').then(res => {
                    if (res.data.meta.code === 200) {
                        sessionStorage.removeItem('token')
                        sessionStorage.removeItem('role')

                        Swal.fire({
                            icon:'success',
                            title: 'Sukses!',
                            text:'Kamu berhasil keluar.',
                        })
                        
                        history.push('/masuk')
                    } else {
                        Swal.fire({
                            icon:'danger',
                            title: 'Gagal!',
                            text:'Kamu gagal keluar.',
                        })
                    }
                })
            }
        })
    }

    if (type === "Internal") {
        return (
            <SidebarContainer>
                <div>
                    <SidebarDashboard activeClassName="active" to="/user/dasbor">
                        <MdDashboard/>
                        Dasbor
                    </SidebarDashboard>

                    <SidebarMenuContainer>
                        <SidebarMenu>
                            <SidebarTitle>Usulan</SidebarTitle>
                            <SidebarList>
                                <SidebarListItem activeClassName="active" to="/user/pengajuan-usulan">
                                    <FaFileInvoice/>
                                    Pengajuan Usulan
                                </SidebarListItem>
                            </SidebarList>
                        </SidebarMenu>
                    </SidebarMenuContainer>
                </div>

                <SidebarLogout onClick={ logoutSubmit }>
                    <FaSignOutAlt/>
                    Keluar
                </SidebarLogout>
            </SidebarContainer>
        )
    } else if(type === "External") {
        return (
            <SidebarContainer>
                <div>
                    <SidebarDashboard activeClassName="active" to="/user/dasbor">
                        <MdDashboard/>
                        Dasbor
                    </SidebarDashboard>

                    <SidebarMenuContainer>
                        <SidebarMenu>
                            <SidebarTitle>Usulan</SidebarTitle>
                            <SidebarList>
                                <SidebarListItem activeClassName="active" to="/user/pengajuan-usulan">
                                    <FaFileInvoice/>
                                    Pengajuan Usulan
                                </SidebarListItem>
                            </SidebarList>
                        </SidebarMenu>
                    </SidebarMenuContainer>
                </div>

                <SidebarLogout onClick={ logoutSubmit }>
                    <FaSignOutAlt/>
                    Keluar
                </SidebarLogout>
            </SidebarContainer>
        )
    } else if (type === "Content") {
        return (
            <SidebarContainer>
                <div>
                    <SidebarDashboard activeClassName="active" to="/admin/dasbor">
                        <MdDashboard/>
                        Dasbor
                    </SidebarDashboard>

                    <SidebarMenuContainer>
                        <SidebarMenu>
                            <SidebarTitle>Konten</SidebarTitle>
                            <SidebarList>
                                <SidebarListItem activeClassName="active" to="/admin/buat-konten">
                                    <FaPenSquare/>
                                    Buat Konten
                                </SidebarListItem>
                                <SidebarListItem activeClassName="active" to="/admin/konten">
                                    <FaList/>
                                    Daftar Konten
                                </SidebarListItem>
                                <SidebarListItem activeClassName="active" to="/admin/kategori">
                                    <FaTags/>
                                    Daftar Kategori
                                </SidebarListItem>
                            </SidebarList>
                        </SidebarMenu>

                        <SidebarMenu>
                            <SidebarTitle>Tentang</SidebarTitle>
                            <SidebarList>
                                <SidebarListItem activeClassName="active" to="/admin/buat-tentang">
                                    <FaPenSquare/>
                                    Buat Tentang
                                </SidebarListItem>
                                <SidebarListItem activeClassName="active" to="/admin/tentang">
                                    <FaList/>
                                    Daftar Tentang
                                </SidebarListItem>
                            </SidebarList>
                        </SidebarMenu>

                        <SidebarMenu>
                            <SidebarTitle>Layanan</SidebarTitle>
                            <SidebarList>
                                <SidebarListItem activeClassName="active" to="/admin/buat-layanan">
                                    <FaPenSquare/>
                                    Buat Layanan
                                </SidebarListItem>
                                <SidebarListItem activeClassName="active" to="/admin/layanan">
                                    <FaList/>
                                    Daftar Layanan
                                </SidebarListItem>
                            </SidebarList>
                        </SidebarMenu>
                    </SidebarMenuContainer>
                </div>

                <SidebarLogout onClick={ logoutSubmit }>
                    <FaSignOutAlt/>
                    Keluar
                </SidebarLogout>
            </SidebarContainer>
        )
    } else if (type === "Proposal") {
        return (
            <SidebarContainer>
                <div>
                    <SidebarDashboard activeClassName="active" to="/admin/dasbor">
                        <MdDashboard/>
                        Dasbor
                    </SidebarDashboard>

                    <SidebarMenuContainer>
                        <SidebarMenu>
                            <SidebarTitle>Usulan</SidebarTitle>
                            <SidebarList>
                                <SidebarListItem activeClassName="active" to="/admin/usulan">
                                    <FaFileInvoice/>
                                    Daftar Usulan
                                </SidebarListItem>
                            </SidebarList>
                        </SidebarMenu>
                        <SidebarMenu>
                            <SidebarTitle>Fasilitas</SidebarTitle>
                            <SidebarList>
                                <SidebarListItem activeClassName="active" to="/admin/fasilitas">
                                    <FaFileInvoice/>
                                    Daftar Fasilitas
                                </SidebarListItem>
                            </SidebarList>
                        </SidebarMenu>
                    </SidebarMenuContainer>
                </div>

                <SidebarLogout onClick={ logoutSubmit }>
                    <FaSignOutAlt/>
                    Keluar
                </SidebarLogout>
            </SidebarContainer>
        )
    } else if(type === "Super") {
        return (
            <SidebarContainer>
                <div>
                    <SidebarDashboard activeClassName="active" to="/admin/dasbor">
                        <MdDashboard/>
                        Dasbor
                    </SidebarDashboard>

                    <SidebarMenuContainer>
                        <SidebarMenu>
                            <SidebarTitle>Konten</SidebarTitle>
                            <SidebarList>
                                <SidebarListItem activeClassName="active" to="/admin/buat-konten">
                                    <FaPenSquare/>
                                    Buat Konten
                                </SidebarListItem>
                                <SidebarListItem activeClassName="active" to="/admin/konten">
                                    <FaList/>
                                    Daftar Konten
                                </SidebarListItem>
                                <SidebarListItem activeClassName="active" to="/admin/kategori">
                                    <FaTags/>
                                    Daftar Kategori
                                </SidebarListItem>
                            </SidebarList>
                        </SidebarMenu>
                        <SidebarMenu>
                            <SidebarTitle>Usulan</SidebarTitle>
                            <SidebarList>
                                <SidebarListItem activeClassName="active" to="/admin/usulan">
                                    <FaFileInvoice/>
                                    Daftar Usulan
                                </SidebarListItem>
                            </SidebarList>
                        </SidebarMenu>
                        <SidebarMenu>
                            <SidebarTitle>Fasilitas</SidebarTitle>
                            <SidebarList>
                                <SidebarListItem activeClassName="active" to="/admin/fasilitas">
                                    <FaFileInvoice/>
                                    Daftar Fasilitas
                                </SidebarListItem>
                            </SidebarList>
                        </SidebarMenu>
                    </SidebarMenuContainer>
                </div>

                <SidebarLogout onClick={ logoutSubmit }>
                    <FaSignOutAlt/>
                    Keluar
                </SidebarLogout>
            </SidebarContainer>
        )
    } else {
        return (
            <>
                Error credential.
            </>
        )
    }
}

export default Sidebar