import { useHistory } from "react-router-dom"

function AuthCheck() {
    const history = useHistory()
    const token = localStorage.getItem('token') 
    const role = localStorage.getItem('role') 

    if (token && role) {
        if (role === "Content" || role === "Proposal" || role === "Super") {
            return history.push("/admin")
        } else if (role === "Internal" || role === "External") {
            return history.push("/user")
        }
    }
}

export default AuthCheck