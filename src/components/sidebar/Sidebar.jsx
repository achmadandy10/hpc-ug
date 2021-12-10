import { FaBell, FaFileInvoice, FaSignOutAlt, FaTimes, FaUserCog } from "react-icons/fa"
import { MdDashboard } from "react-icons/md"
import { SidebarButtonClose, SidebarContainer, SidebarContent, SidebarLink, SidebarLogoutButton } from "./Sidebar.elements"

const UserInternal = () => {
    return (
        <>
            <SidebarLink activeClassName="active" to="/user/dasbor">
                <MdDashboard/>
                Dasbor
            </SidebarLink>
            <SidebarLink activeClassName="active" to="/user/pengajuan+usulan">
                <FaFileInvoice/>
                Pengajuan Usulan
            </SidebarLink>
            <SidebarLink activeClassName="active" to="/user/notifikasi">
                <FaBell/>
                Notifikasi
            </SidebarLink>
            <SidebarLink activeClassName="active" to="/user/profil">
                <FaUserCog/>
                Pengaturan
            </SidebarLink>
        </>
    )
}

const Sidebar = ({ type }) => {
    if (type === "user internal") {
        return (
            <SidebarContainer>
                <SidebarButtonClose>
                    <FaTimes/>
                </SidebarButtonClose>

                <SidebarContent>
                    <UserInternal/>
                </SidebarContent>
                
                <SidebarLogoutButton>
                    <FaSignOutAlt/>
                    Keluar
                </SidebarLogoutButton>
            </SidebarContainer>
        )
    } else {
        return (
            <>
                Error: Please choose type sidebar.
            </>
        )
    }
}

export default Sidebar