import { CopyRight } from "../../../components/footer/Footer"
import TextField from "../../../components/text_field/TextField"
import { RegisterContainer, RegisterContent, RegisterForm, RegisterLeft, RegisterRight, RegisterTitle } from "./Register.elements"

const Register = () => {
    return (
        <RegisterContainer>
            <RegisterLeft>

            </RegisterLeft>
            <RegisterRight>
                <RegisterContent>
                    <RegisterTitle>Buat akun HPC anda</RegisterTitle>
                
                    <RegisterForm>
                        <TextField/>
                    </RegisterForm>
                </RegisterContent>
                <CopyRight/>
            </RegisterRight>
        </RegisterContainer>
    )
}

export default Register