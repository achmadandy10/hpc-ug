import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import { AdminLayoutContainer, AdminLayoutMain, AdminLayoutPage, AdminLayoutSidebar } from "./AdminLayout.elements"
import { Route, Switch, Redirect } from 'react-router-dom'
import { AdminRouter } from "../../routes/admin/AdminRouter"
import { useEffect } from "react"
// import ThemeChange from "../../components/theme_change/ThemeChange"

const AdminLayout = () => {
    useEffect(() => {
        const role = () => {
            localStorage.setItem("role", "Admin")
        }

        role()
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
            {/* <ThemeChange/> */}
        </AdminLayoutContainer>
    )
}

export default AdminLayout