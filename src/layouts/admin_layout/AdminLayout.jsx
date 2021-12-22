import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import { AdminLayoutContainer, AdminLayoutMain, AdminLayoutPage, AdminLayoutSidebar } from "./AdminLayout.elements"
import { Route, Switch, Redirect } from 'react-router-dom'
import { AdminContentRouter, AdminProposalRouter, AdminSuperRouter } from "../../routes/admin/AdminRouter"

const AdminLayout = () => {
    let AdminRouter = ''
    const role = sessionStorage.getItem('role')
    if (role === "Content") {
        AdminRouter = AdminContentRouter
    } else if (role === "Proposal") {
        AdminRouter = AdminProposalRouter
    } else if (role === "Super") {
        AdminRouter = AdminSuperRouter
    }

    return (
        <AdminLayoutContainer>
            <Topbar/>

            <AdminLayoutMain>
                <AdminLayoutSidebar id="sidebar">
                    <Sidebar type={ role }/>
                </AdminLayoutSidebar>

                <AdminLayoutPage>
                    <Switch>
                        {
                            AdminRouter.map((route, idx ) => {
                                return (
                                    route.component && (
                                        <Route
                                            key={ idx }
                                            path={ route.path }
                                            exact={ route.exact }
                                            name={ route.name }
                                            render={ (props) =>
                                                <route.component { ...props } />
                                            }
                                        />
                                    )
                                )
                            })
                        }
                        <Redirect from="/admin" to="/admin/dasbor"/>
                    </Switch>
                </AdminLayoutPage>
            </AdminLayoutMain>
        </AdminLayoutContainer>
    )
}

export default AdminLayout