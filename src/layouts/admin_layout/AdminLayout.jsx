import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import { AdminLayoutContainer, AdminLayoutMain, AdminLayoutPage, AdminLayoutSidebar } from "./AdminLayout.elements"
import { Route, Switch, Redirect } from 'react-router-dom'
import { AdminRouter } from "../../routes/admin/AdminRouter"
import { useEffect } from "react"

const AdminLayout = () => {
    useEffect(() => {
        const session = () => {
            sessionStorage.setItem("role", "Admin")
        }

        session()
    }, [])
    return (
        <AdminLayoutContainer>
            <Topbar/>

            <AdminLayoutMain>
                <AdminLayoutSidebar id="sidebar">
                    <Sidebar type="admin"/>
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