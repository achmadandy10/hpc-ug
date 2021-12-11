import { SidebarContainer, SidebarDashboard, SidebarList, SidebarListItem, SidebarLogout, SidebarMenu, SidebarMenuContainer, SidebarTitle } from "./Sidebar.elements"
import { MdDashboard } from "react-icons/md"
import { FaFileInvoice, FaSignOutAlt } from "react-icons/fa"

const Sidebar = ({ type }) => {
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

                <SidebarLogout>
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