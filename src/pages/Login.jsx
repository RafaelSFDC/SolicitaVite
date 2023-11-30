import { useState } from "react";
import "./Login.css"
import { useSnapshot } from 'valtio';
import { ColorRing } from 'react-loader-spinner'
import state from "../store";
import { LogUser, logOut, verifyUser } from "../FirebaseConfig";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/images/LOGO SEM FUNDO.1.png"
import { motion } from "framer-motion";
import { Toaster, toast } from 'sonner'

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    useSnapshot(state)
    // const logIn = useSignIn()

    const signIn = async (e) => {
        e.preventDefault();
        const promise = async () => {
            try {
                const result = await LogUser(email, password);
                if (result) {
                    const permission = await verifyUser(result.user)
                    if (!permission) {
                        throw Error("Usuário não tem permissão para acessar")
                    } else {
                        return
                    }
                } else {
                    throw Error("Usuário não encontrado, tente novamente.")
                }
            } catch (error) {
                throw Error(error)
            }

        }
        toast.promise(promise, {
            loading: 'Fazendo Login...',
            success: (data) => {
                return ` Login realizado com sucesso!`;
            },
            error: (error) => {
                return `${error}`
            },
        });

    };
    const emailChange = event => {
        setEmail(event.target.value)
    };

    const passwordChange = event => {
        setPassword(event.target.value)
    };

    return (
        <>
            <Toaster richColors position="top-right" />
            <motion.div className="loginContainer">

                <img src={logo} alt="Solicita Logo" className="logo" />
                <form onSubmit={(e) => signIn(e)} className="login-form">
                    <h3>Bem Vindo!</h3>
                    <div className="input-field">
                        <input type="email" name="email" id="email" required placeholder="Email" onChange={emailChange} />
                        <input type="password" name="password" required placeholder="Senha" onChange={passwordChange} />
                    </div>
                    <div className="info-field">
                        <div style={{ display: "flex" }}>
                            <input type="checkbox" name="" id="" />
                            <p>Lembrar-me</p>
                        </div>
                        <p>Esqueceu a senha?</p>
                    </div>
                    {loading ? <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    /> : <button type="submit">Entrar</button>}
                    <p className="fix">Ainda não tem uma conta? <span className="fix">Solicitar</span></p>
                </form>

            </motion.div>
        </>

    )
};

export default Login;
