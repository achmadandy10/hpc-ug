import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import Dashboard from "../../views/users/user_internal/dashboard/Dashboard"
import { UserLayoutContainer, UserLayoutMain } from "./UserLayout.elements"

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
    return (
        <UserLayoutContainer>
            <Topbar/>

            <UserLayoutMain>
                <Sidebar type="user internal"/>
                <Dashboard/>
            </UserLayoutMain>
        </UserLayoutContainer>
    )
}

export default UserLayout