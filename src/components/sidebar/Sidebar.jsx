import { SidebarContainer, SidebarDashboard, SidebarList, SidebarListItem, SidebarLogout, SidebarMenu, SidebarMenuContainer, SidebarTitle } from "./Sidebar.elements"
import { MdDashboard } from "react-icons/md"
import { FaFileInvoice, FaSignOutAlt } from "react-icons/fa"
import Swal from "sweetalert2"
import { useHistory } from "react-router-dom"

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
                Swal.fire({
                    icon:'success',
                    title: 'Sukses!',
                    text:'Kamu berhasil keluar.',
                }).then((result) => {
                    history.push('/masuk')
                })
            }
        })
    }

    if (type === "user internal") {
        return (
            <SidebarContainer>
                <div>
                    <SidebarDashboard activeClassName="active" to="/user/dasbor">
                        <MdDashboard/>
                        Dasbor
                    </SidebarDashboard>

                    <SidebarMenuContainer>
                        <SidebarMenu>
                            <SidebarTitle>Pengajuan</SidebarTitle>
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
    } else {
        return (
            <>
                Error credential.
            </>
        )
    }
}

export default Sidebar