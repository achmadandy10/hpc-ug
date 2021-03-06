import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import { UserLayoutContainer, UserLayoutMain, UserLayoutPage, UserLayoutSidebar } from "./UserLayout.elements"
import { Route, Switch, Redirect } from 'react-router-dom'
import { UserRouter } from "../../routes/user/UserRouter"

const UserLayout = () => {
    const role = localStorage.getItem('role')
    return (
        <UserLayoutContainer>
            <Topbar/>

            <UserLayoutMain>
                <UserLayoutSidebar id="sidebar">
                    <Sidebar type={ role }/>
                </UserLayoutSidebar>

                <UserLayoutPage>
                    <Switch>
                        {
                            UserRouter.map((route, idx ) => {
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
                        <Redirect from="/user" to="/user/dasbor"/>
                    </Switch>
                </UserLayoutPage>
            </UserLayoutMain>
        </UserLayoutContainer>
    )
}

export default UserLayout