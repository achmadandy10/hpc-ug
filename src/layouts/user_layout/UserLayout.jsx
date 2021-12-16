import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import { UserLayoutContainer, UserLayoutMain, UserLayoutPage, UserLayoutSidebar } from "./UserLayout.elements"
import { Route, Switch, Redirect } from 'react-router-dom'
import { UserRouter } from "../../routes/user/UserRouter"
import { useEffect } from "react"
// import ThemeChange from "../../components/theme_change/ThemeChange"

// const Internal = () => {
//     return (
//         <>
//             internal
//         </>
//     )
// }

// const External = () => {
//     return (
//         <>
//             external
//         </>
//     )
// }

const UserLayout = () => {
    useEffect(() => {
        const session = () => {
            sessionStorage.setItem("role", "User")
        }

        session()
    }, [])
    return (
        <UserLayoutContainer>
            <Topbar/>

            <UserLayoutMain>
                <UserLayoutSidebar id="sidebar">
                    <Sidebar type="user internal"/>
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
            {/* <ThemeChange/> */}
        </UserLayoutContainer>
    )
}

export default UserLayout