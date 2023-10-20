import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Se você estiver usando esse hook
import { useSnapshot } from "valtio";
import state from "../store";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";

const IsAuth = () => {
    const auth = FIREBASE_AUTH; // Use a instância FIREBASE_AUTH
    useSnapshot(state);
    const { location } = useLocation();

    // Verifica o estado de autenticação
    useEffect(() => {
        // Configura o ouvinte de autenticação
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                state.user = user;
                state.logged = true
                console.log("usuario: ", user)
            } else {
                state.user = null;
                state.logged = false
            }
        });

        return () => {

            unsubscribe(); // Certifique-se de cancelar a inscrição ao desmontar o componente
        }
    }, []);

    return (
        state.logged ? <Navigate to="/" state={{ from: location }} replace /> : <Outlet />
    )
}

export default IsAuth;

