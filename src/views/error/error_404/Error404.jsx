import { FaArrowLeft } from "react-icons/fa"
import { useHistory } from "react-router-dom"
import { ButtonSubmit } from "../../../components/button/Button"
import E404 from '../../../images/404.svg'

const Error404 = () => {
    const history = useHistory()

    const handleBack = () => {
        const token = localStorage.getItem('token') 
        const role = localStorage.getItem('role') 
        const username = localStorage.getItem('username') 

        if (token && role && username) {
            if (role === "Content" || role === "Proposal" || role === "Super") {
                return history.push("/admin")
            } else if (role === "Internal" || role === "External") {
                return history.push("/user")
            }
        } else {
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            localStorage.removeItem('username')
            return history.push("/masuk")
        }
    }

    return (
        <div
            style={{
                height: "100vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px"
            }}
        >
            <img style={{ width: "300px" }} src={ E404 } alt="" />
            <h3>ERROR 404</h3>
            <ButtonSubmit onClicked={ handleBack }>
                <FaArrowLeft/>
                Kembali
            </ButtonSubmit>
        </div>
    )
}

export default Error404